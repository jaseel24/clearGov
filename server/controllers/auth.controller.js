const User = require("../models/user");
const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

///////////////////////////// REGISTER ////////////////////////////////

module.exports.register = async (req, res) => {
    try {
        const isExist = await User.findOne({ email: req.body.email });

        if (isExist) {
            return res.status(409).json({ message: "User already exists", status: "failed" });
        }
        const user = new User({ ...req.body, role: req.body.role });
        user.save();
        res.status(201).json({ message: "Registration success", user: user });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message, status: "failed" });
    }
};

///////////////////////////// LOGIN ////////////////////////////////

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: "user not found", status: "failed" });
        }
        if (!user.isActive) {
            return res.status(403).json({ message: "user account is blocked", status: "failed" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "invalid credentials", status: "failed" });
        }
        const token = sign({ userId: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: "5hr" });
        res.cookie("accessToken", token, { httpOnly: true, maxAge: 3600000 });
        res.status(200).json({ message: "login success", token, role: user.role, user });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message, status: "failed" });
    }
};

//////////////////////// Get logined user profile //////////////////////

module.exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        res.status(200).json({ message: "success", user });
    } catch (error) {
        console.log(error);
    }
};

///////////////////////////// LOGOUT ////////////////////////////////

module.exports.logout = async (req, res) => {
    res.clearCookie("accessToken");
    res.status(200).json({ message: "Successfully logged out" });
};


////////////////// ADMIN LOGIN //////////////////////////

module.exports.adminLogin = async (req, res) => {
    console.log("form admin login");
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email: email });

        console.log(admin);

        if (admin) {
            const auth = await bcrypt.compare(password, admin.password);
            console.log(auth);

            if (auth) {
                const token = sign({ userId: admin._id, role: "Admin" }, process.env.SECRET_KEY, { expiresIn: "5hr" });
                res.cookie("accessToken", token, { httpOnly: true, maxAge: 3600000 });
                res.status(200).json({ message: "Login success!", admin });
            } else {
                res.status(400).json({ message: "Ivalid credentials!" });
            }
        } else {
            res.status(404).json({ message: "User not found!" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};
