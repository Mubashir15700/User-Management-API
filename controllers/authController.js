import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Admin from '../models/adminModel.js';
import User from '../models/usersModel.js';

export const registerUser = async (req, res) => {
    try {
        console.log(req.body);
    } catch (error) {
        console.log(error);
    }
};

export const loginUser = async (req, res) => {
    try {
        console.log(req.body);
    } catch (error) {
        console.log(error);
    }
};