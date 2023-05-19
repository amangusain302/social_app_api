const jwt = require("jsonwebtoken");

module.exports = genJWTtoken = ({ _id, mobile, email_id, user_id, user_name, name }) => {
    return jwt.sign({ _id, mobile, email_id, user_id, user_name, name }, process.env.JWT_SECRET, {
        expiresIn: "15d"
    })
}