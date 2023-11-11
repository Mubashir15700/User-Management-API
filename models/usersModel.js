import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        required: true,
        type: String,
        unique: true,
        maxLength: 25,
    },
    email: {
        required: true,
        type: String,
        unique: true,
    },
    phone: {
        required: true,
        type: Number,
        unique: true,
        minLength: 10,
        maxLength: 10,
    },
    password: {
        required: true,
        type: String,
        minLength: 4,
    },
});

const user = mongoose.model("user", userSchema);

export default user;