const jwt = require('jsonwebtoken');

const authControl = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403).json({ msg: 'Authorization Header Missing' });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(403).json({ msg: 'Token is missing' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(400).json({ message: "Invalid token." });
    }
};
module.exports = authControl;