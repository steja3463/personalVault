const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
},
    {
        versionKey: false
    })
userSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt);
        next();
    }
    catch (err) {
        next(err);
    }
})
userSchema.methods.comparePassword = function (pass) {
    return bcrypt.compare(pass, this.password);
}
module.exports = mongoose.model('User', userSchema);