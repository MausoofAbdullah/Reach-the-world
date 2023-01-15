import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import twilioController from "./twilioController.js";

//Registering new user
export const registerUser = async (req, res) => {
  // const salt = await bcrypt.genSalt(10);
  // const hashedPass = await bcrypt.hash(req.body.password, salt);
  // req.body.password = hashedPass;

  // const newUser = new UserModel(req.body);
  // const { username,mobile } = req.body;
  

  try {
    console.log(req.body,"what is req.body")
    const oldUser = await UserModel.findOne({
      $or: [
        { username: req.body.username },
        { mobile: req.body.mobile }
      ]
    });
    
    if (oldUser) {
      return res
        .status(400)
        .json({ message: "username is already registeresd" });
    }
    //trying for otp signup or register
    else {
      console.log('to otp')
      const data = await twilioController.doSms(req.body)
      console.log(data, 'otpcheck')
      if (data) {
        res.status(201).json({
          status: 'otp generated'
        })
      }
    }
  

    //bifore otp trying
    // const user = await newUser.save();

    // const token = jwt.sign(
    //   {
    //     username: user.username,
    //     id: user._id,
    //   },
    //   process.env.JWT_KEY,
    //   { expiresIn: "1h" }
    // );
    // res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//verifying user for otp

export const verifyUser=async (req, res, next) => {
  try {
    const result = await twilioController.otpVerify(req.body.otp, req.body.userData.mobile)
    console.log(result,"result of otp")
    if (result) {
      const userData = req.body.userData
      const salt = await bcrypt.genSalt(10)
      userData.password = await bcrypt.hash(userData.password, salt)
      userData.confirmPassword = await bcrypt.hash(userData.confirmPassword, salt)
      userData.Active = true
     // await UserModel.create(userData)
     const newUserModel= new UserModel(userData)
     await newUserModel.save()
      res.status(201).json({
        status: 'signup completed'
      })
    } else {
      res.status(401).json({
        status: 'otp verification failed'
      })
    }
  } catch (error) {
    console.log(error)
  }
}

//login user before otp trying

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username: username });
    if (user) {
      const validity = await bcrypt.compare(password, user.password);

      // validity?res.status(200).json(user):res.status(400).json("wrong Password")
      if (!validity) {
        res.status(400).json("wrong password");
      } else {
        const token = jwt.sign(
          {
            username: user.username,
            id: user._id,
          },
          process.env.JWT_KEY,
          { expiresIn: "1h" }
        );
       
        res.status(200).json({ user, token });
        console.log(user,"login");
      }
    } else {
      res.status(400).json("user does not exist");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
