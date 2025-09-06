// models/driver.js
const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    licenseNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    contact: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    image: {
      type: String, // URL of driver image
      default: "",
    },
    // A driver can have multiple vehicles
    vehicles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle",
      },
    ],
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    }
  },
  { timestamps: true }
);

// Add pre-save hook to check for existing email
driverSchema.pre("save", async function (next) {
  const driver = this;
  try {
    const existingDriver = await this.constructor.findOne({ email: driver.email });
    if (existingDriver) {
      next(new Error("Email address already exists"));
    }
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Driver", driverSchema);