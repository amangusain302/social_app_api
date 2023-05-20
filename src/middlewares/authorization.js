const jwt = require('jsonwebtoken');
const { catchAsyncError } = require('./catchAsyncError');

const authorization = catchAsyncError(async(req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.status(401).json({ success: false, message: "Provide Authorization" })
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err && err.name == 'TokenExpiredError') { return res.status(403).json({ success: false, message: "Authorization token expired", error: err }) } else if (err) {
            return res.status(403).json({ success: false, message: "Authorization token is Invalid", error: err })
        }
        req.user = user;
        next();
    })
})

module.exports = authorization;