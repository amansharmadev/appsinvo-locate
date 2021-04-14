const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY;

const encryptPassword = async function (password, rounds = 10) {
    return await bcrypt.hash(password, await bcrypt.genSalt(rounds));
}

const generateJWTToken = function (user, expiresIn = 86400) {
    const obj = {
        _id: user._id,
        name: user.name,
        email: user.email,
        status: user.status,
        address: user.address,
        latitude: user.latitude,
        longitude: user.longitude,
        register_at: user.register_at,
    }
    return jwt.sign(obj, JWT_KEY, { expiresIn });
}

const verifyToken = async function (req, res, next) {
    try {
        const { token } = req.headers;
        if (!token) {
            throw new Error();
        }
        jwt.verify(token, JWT_KEY);
        req['user'] = jwt.decode(token);
        return next();
    } catch (error) {
        res.status(401).send();
    }
}


module.exports = {
    encryptPassword,
    generateJWTToken,
    verifyToken,
}