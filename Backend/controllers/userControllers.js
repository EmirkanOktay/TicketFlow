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
        res.status(500).json({ message: "Server error", error: error.message });

    }

}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email or password is empty" });
        }
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ message: "wrong password" })
        }

        const token = jwt.sign({
            id: user.id, role: user.role
        },
            process.env.JWT_SECRET, { expiresIn: "1d" })

        res.status(200).json({
            _id: user._id,
            name: user.name,
            surname: user.surname,
            role: user.role,
            token
        });
        console.log("user found")
    } catch (error) {
        console.log("login error " + " " + error)
    }

}
const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) return res.status(400).json({ message: "id is required" });

        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        await user.deleteOne();
        res.status(200).json({ message: "User deleted successfully" });

    } catch (error) {
        console.log("delete error " + error);
        next(error);
    }
};

const editUser = async (req, res, next) => {
    try {
        const { name, surname, email, password, role, id } = req.body;

        const user = await User.findOne({ id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (name) user.name = name;
        if (surname) user.surname = surname;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }
        if (role) user.role = role;

        await user.save();
        res.status(200).json({ message: "User updated successfully", user });

    } catch (error) {
        console.error("Error editing user:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

const showUsers = async (req, res, next) => {
    try {
        const users = await User.find()
        res.status(400).json({ users });
    } catch (error) {
        console.log("error show users " + error)
        res.status(400).json({ message: "error for show users" })
    }
}
const showUsersByRole = async (req, res, next) => {
    try {
        const userRole = req.user.role;
        const role = req.query.role;
        let filter = {};

        if (role) filter.role = role;

        if (userRole !== "Admin" && userRole !== "IT") {
            filter._id = req.user.id;
        }

        const users = await User.find(filter).select("name surname email role");

        res.status(200).json({ users });
    } catch (error) {
        console.error("Show users by role error:", error);
        res.status(500).json({ message: "Server error" });
    }
};



module.exports = { register, login, deleteUser, editUser, showUsers, showUsersByRole };
