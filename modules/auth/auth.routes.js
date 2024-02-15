import { Router } from "express";
import userModel from "../../DB/model/user.model.js";
import { confirmEmail, signIn, signUp,refreshToken } from "./controller/auth.controller.js";
const router = Router();


router.post("/signup", signUp)
router.post("/signin", signIn)
router.get("/confirmEmail/:token", confirmEmail)
router.get("/refreshToken/:token", refreshToken)






router.get("/", async (req, res) => {
    const user = await userModel.find({})
    res.json({ message: "auth", user })
})
export default router