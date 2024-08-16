import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const generateAccount = async (req, res) => {
  try {
    const { name, email, password, roleType } = req.body;
    if ((!name || !email || !password, !roleType))
      return res.status(400).json("All fields required");

    const foundUser = await User.findOne({ email });
    if (foundUser) return res.status(400).json("User already exists");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      roleType: roleType,
    });
    return res.status(201).json("New user created successfuly");

    // const user = {
    //     _id: newUser._id,
    //     name: newUser.name,
    //     email: newUser.email,
    //     roleType: newUser.roleType,
    //     officeId: newUser.officeId,
    //   };
    // const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,{expiresIn: "15m"});
    // const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET,{expiresIn: "30m"});
  } catch (error) {
    console.log(error);
    return res.status(500).json("Server error");
  }
};

const sigIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json("All fields required");
    const foundUser = await User.findOne({ email: email });
    if (!foundUser) return res.status(401).json("Invalid credentials");

    // CHECK IF THE PASSWORDS MATCH
    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) return res.status(401).json("Invalid credentials");
    const user = {
      _id: foundUser._id,
      name: foundUser.name,
      email: foundUser.email,
      roleType: foundUser.roleType,
      officeId: foundUser.officeId,
    };
    // GENERATE ACCESS AND REFRESHTOKEN
    // SAVE REFRESHTOKEN IN DB AND SEND TO HTTPONLY COOKIE
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1h",
    });
    const userUpdate = await User.updateOne({ email }, { refreshToken });

    res.cookie("rjwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60 * 1000,
      withCredentials: true,
    });

    return res.status(200).json({ data: accessToken });
  } catch (error) {
    console.log(error);

    return res.status(500).json("Server error");
  }
};

const logOut = async (req, res) => {
  try {
    // ACCESS COOKIES FROM REQUEST
    const cookies = req.cookies;
    if (!cookies?.rjwt) return res.sendStatus(204);
    // GET THE REFRESHTOKEN FROM THE COOKIE
    // FIND THE USER WITH THE REFRESHTOKEN AND
    // CLEAR THE TOKEN FROM BOTH THE DB AND COOKIE
    const refreshToken = cookies.rjwt;
    const foundUser = await User.findOne({ refreshToken });
    if (!foundUser) {
      res.clearCookie("rjwt", {
        withCredentials: true,
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      return res.sendStatus(204);
    }

    const userUpdate = await User.updateOne(
      { refreshToken },
      { refreshToken: "" }
    );
    res.clearCookie("rjwt", {
      withCredentials: true,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json("Server error");
  }
};

const refreshToken = async (req, res) => {
  try {
    // ACCESS COOKIES FROM REQUEST
    const cookies = req.cookies;
    if (!cookies?.rjwt) return res.sendStatus(401);
    // GET THE REFRESHTOKEN FROM THE COOKIE
    // FIND THE USER WITH THE REFRESHTOKEN AND
    // CREATE PAYLOAD FOR THE TOKEN
    const refreshToken = cookies.rjwt;
    const foundUser = await User.findOne({ refreshToken });
    if (!foundUser) return res.sendStatus(403);
    const user = {
      _id: foundUser._id,
      name: foundUser.name,
      email: foundUser.email,
      roleType: foundUser.roleType,
      officeId: foundUser.officeId,
    };
    // VERIFY THE REFRESHTOKEN AND
    // REGENERATE A NEW ACCESSTOKEN
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      function (err, decoded) {
        if (err) return res.sendStatus(403);
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "15m",
        });
        return res.status(200).json({ data: accessToken });
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json("Server error");
  }
};

export { generateAccount, sigIn, logOut, refreshToken };
