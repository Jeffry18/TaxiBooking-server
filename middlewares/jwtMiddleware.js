const jwt = require('jsonwebtoken')

const jwtMiddleware = (req, res, next) => {
    console.log("inside middleware");
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header missing" });
    }
    const token = req.headers['authorization'].split(" ")[1]
    console.log(token);
    if (token != '') {
        try {
            const jwtResponse = jwt.verify(token, process.env.JWTPASSWORD)
            console.log(jwtResponse);
            req.userId = jwtResponse.userId
        } catch (error) {
            res.status(401).json("authorisation failed.. please login..!!")
        }


    } else {
        res.status(404).json("Authorisation Failed.. token is missing...!!")
    }

    next()
}

module.exports = jwtMiddleware