import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        default: "Male",
        enums: ['Female', 'Male']
    },
    confirmEmail: {
        type: Boolean,
        default: false
    },

    profilePic: {
        type: String
    },
    coverPics: {
        type: Array
    },
    lastSeen: {
        type: Date
    },
    birthDate: {
        type: String
    }
},
    {
        timestamps: true
    })

const userModel = mongoose.model('user', userSchema)

export default userModel;