const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async(req, res) => {
    try{
        const{ name, email , password } = req.body;
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({msg: 'User already register'});
        }
        user = new User({
            name,
            email,
            password
        });
        await user.save();
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });
        res.status(200).json({msg: 'User Regsitered Successfully', token, user});
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg: 'Server Error'});
    }
}

exports.login = async(req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({msg: 'User Not Found'});
        }
        const match = await user.comparePassword(password);
        if(!match){
            return res.status(403).json({msg: 'Invalid Password'});
        }
        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET,{
            expiresIn: process.env.JWT_EXPIRES_IN
        });
        res.status(200).json({msg: 'Login Successfull', token , user});
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg: 'Server Error'});
    }
}
