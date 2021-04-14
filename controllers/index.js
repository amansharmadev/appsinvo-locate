const UserModel = require('../models/user.model');
const geodist = require('geodist');
const isValidCoordinates = require('is-valid-coordinates');

const createUser = async function ({ body }, res) {
    const user = new UserModel(body);
    res.send(await user.save());
}

const updateStatus = async function (req, res) {
    const { _id } = req.user;
    const user = await UserModel.findOne({ _id });
    if (!user) {
        throw new Error('User not found');
    }
    user.status = user.status === 'active' ? 'inactive' : 'active';
    await user.save();
    res.status(200).send(user.status);
}

const getDistance = async function ({ body, user }, res) {
    const { latitude, longitude } = user;
    if (!isValidCoordinates(body.latitude, body.longitude)) {
        return res.status(400).send('Invalid coordinates');
    }
    const distance = geodist({ latitude, longitude }, body, { unit: 'km' });
    res.send({ distance: distance + 'km' });
}

const getUsers = async function ({body}, res) {
    const users = await UserModel.find({}, { _id: 0, name: 1, email: 1, register_at: 1 }).lean();
    const { weekNumber } = body;
    const data = {};
    for (let i = 0; i < weekNumber.length; i++) {
        const day = weekNumber[i];
        data[day] = users.filter(u => new Date(u.register_at).getDay() === day).map(u => ({ name: u.name, email: u.email }));
    }
    res.send(data);
}

module.exports = {
    createUser,
    updateStatus,
    getDistance,
    getUsers,
}