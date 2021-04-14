const mongoose = require('mongoose');
const { Schema } = mongoose;
const validator = require('validator');
const isValidCoordinates = require('is-valid-coordinates');

const { generateJWTToken, encryptPassword } = require('../utils/encryption');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: [2, 'Name should be three letters long'],
    },
    email: {
        type: String,
        required: true,
        // unique: true,
        validator: function (val) {
            validator.isEmail(val)
        }
    },
    address: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true,
        validator: function (val) {
            isValidCoordinates.latitude(val);
        }
    },
    longitude: {
        type: Number,
        required: true,
        validator: function (val) {
            isValidCoordinates.longitude(val);
        }
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
        required: true
    }
}, { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: { createdAt: 'register_at' } });

userSchema.virtual('token').get(function () {
    return generateJWTToken(this);
});

userSchema.pre(['save'], async function (next) {
    this.password = await encryptPassword(this.password);
    next();
})


const User = mongoose.model('user', userSchema);
module.exports = User;