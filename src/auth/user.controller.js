import UserModel from "./user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
  try {
    const { fullname, email, mobile, role, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "user already in use." });

    const newUser = await UserModel.create({
      fullname,
      email,
      mobile,
      role,
      password,
      plainPassword: password,
      status: "active"
    });

    res.json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        mobile: newUser.mobile,
        role: newUser.role,
        status: newUser.status,
      },
    });

  } catch (err) {
    res.status(500).json({ message: err.message || "server error" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find().select("-password -plainPassword -updatedAt -__v")
    .sort({ createdAt: -1 });

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message || "server error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // If password is being updated
    if (data.password) {
      // Store plain password
      data.plainPassword = data.password;
      
      // Hash the new password
      const encryptedPass = await bcrypt.hash(data.password, 12);
      data.password = encryptedPass;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(id, data, { new: true });
    
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message || "server error" });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    // console.log("----",user)
    if (!user) 
        return res.status(404).json({ message: "user not found" });

    if (user.status === "inactive")
      return res.status(403).json({ message: "Your account has been deactivated. Please contact admin." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "invalid emil or password" });

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
        status: user.status,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "server error" });
  }
};
