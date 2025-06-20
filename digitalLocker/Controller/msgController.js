//msgController.js
const Msg = require('../models/Msg');
const User = require('../models/User'); 

exports.createSecret = async (req, res) => {
    try {
        const { title, content } = req.body;
        const secret = new Msg({
            title,
            content,
            userId: req.user._id
        });
        await secret.save();
        res.status(201).json({ msg: 'Message created successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Server Error' });
    }
};

exports.getAllSecrets = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ msg: 'Unauthorized - Invalid token' });
    }

    const secrets = await Msg.find({ userId: req.user.id }); // ✅ Only user's messages
    res.json(secrets);
  } catch (err) {
    console.error('Error fetching secrets:', err);
    res.status(500).json({ msg: 'Server Error' });
  }
};


exports.deleteSecret = async (req, res) => {
    try {
        const msg = await Msg.findOneAndDelete({ userId: req.user._id, title: req.params.title });
        if (!msg) {
            return res.status(404).json({ msg: 'Message not found' });
        }
        res.status(200).json({ msg: 'Message deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Server Error' });
    }
};
