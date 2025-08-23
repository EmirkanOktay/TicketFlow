const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const register = async (req, res, next) => {

    try {
        const { name, surname, email, password, role } = req.body;

        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({ message: "User already exists" });
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const user = await User.create({
            name,
            surname,
            email,
            password: hash,
            role
        })

        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                surname: user.surname,
                password: user.password,
                role: user.role,
                token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })
            })
            console.log("user created!")
        }

        else {
            res.status(400).json({ message: "invalid user data" })
        }


    } catch (error) {
        console.log("register error " + error)
    }

}



module.exports = { register }