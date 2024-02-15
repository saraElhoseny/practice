import userModel from '../../../DB/model/user.model.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import { sendEmail } from '../../../services/sendEmail.js';

export const signUp = async (req, res) => {
    try{
    const { userName, email, password, cpassword, } = req.body;
    if (password == cpassword) {
        const foundedUser = await userModel.findOne({ email });
        if (foundedUser) {
            res.json({ message: "Already registered" });
        } else {
            let hashed = bcrypt.hashSync(password, 5);
           let user = new userModel({ userName, email, password: hashed });
            let savedUser = await user.save();
            let token = jwt.sign({ id: savedUser._id }, process.env.tokenemailkey,{ expiresIn: 60 })
            let refreshToken = jwt.sign({ id: savedUser._id }, process.env.tokenemailkey, { expiresIn: 6000000000 })
            let message = `<a href="http://localhost:3000/api/v1/auth/confirmEmail/${token}">please click here to verify your email</a>
            <br>
            <br>
            <a href = "http://localhost:3000/api/v1/auth/refreshToken/${refreshToken}">click here to get new one</a>
             `       
                       
            // let message = 'Hello from Adham'
            sendEmail(email, message)
            res.json({ message: "Saved", savedUser })
        }
    } else {
        res.json({ message: "password doesnt match" })
    }
}catch(error){
    res.json({message:"error"},error)
}
};

export const signIn = async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
        const matched = bcrypt.compareSync(password, user.password);
        if (matched) {
            if (user.confirmEmail) {
                const token = jwt.sign({ isLogin: true, id: user._id }, process.env.tokenKey, { expiresIn: 6000000 })
                res.json({ message: "You are logged in", user, token })
            } else {
                res.json({ message: "Please confirm ur email" })
            }
        } else {
            res.json({ message: "Password is incorrect" })
        }
    } else {
        res.json({ message: "You have to register first" })
    }
}

export const confirmEmail = async (req, res) => {
    let { token } = req.params;
    let decoded = jwt.verify(token, process.env.tokenemailkey)
    if (decoded) {
        let user = await userModel.findOne({ _id: decoded.id, confirmEmail: false })
        if (user) {
            let updatedUser = await userModel.findByIdAndUpdate(decoded.id, { confirmEmail: true }, { new: true })
            res.json({ message: "updated", updatedUser })
        } else {
            res.json({ message: "you are already verified" })
        }
    } else {
        res.json({ message: "invalid token" })
    }
}

export const refreshToken = async (req, res) => {
    let { token } = req.params
    let decoded = jwt.verify(token, process.env.tokenemailkey);
    if (!decoded || !decoded.id) {
        res.json({ message: "invalid token" })
    } else {
        const user = await userModel.findById(decoded.id);
        if (!user) {
            res.json({ message: "register first" })
        } else {
            if (user.confirmEmail) {
                res.json({ message: "already confirmed" })
            } else {
                let token = jwt.sign({ id: user._id }, process.env.tokenemailkey)
                let message = `<a href="http://localhost:3000/api/v1/auth/confirmEmail/${token}">this is the 2nd email</a>`
                sendEmail(user.email, message)
                res.json({ message: "done please check ur email" })
            }
        }
    }
}