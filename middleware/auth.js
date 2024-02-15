import e from 'express';
import jwt from 'jsonwebtoken';
import userModel from '../DB/model/user.model.js';


export const auth = () => {
    return async (req, res, next) => {
        try {
            const { authorization } = req.headers;
            console.log(authorization);
            var token = authorization.split(" ")[1];
            if (authorization.startsWith("Bearer")) {
                const decoded = jwt.verify(token, process.env.tokenKey)
                console.log(decoded);
                if (decoded) {
                    const user = await userModel.findById(decoded.id);
                    if (user) {
                        req.currentUserId = user._id
                        next();
                    } else {
                        res.json({ message: "User not found" })
                    }
                } else {
                    res.json({ message: "invalid token" })
                }
            } else {
                res.json({ message: "invalid token" })
            }
        } catch (error) {
            res.json({ message: "error", error })
        }
    }
}