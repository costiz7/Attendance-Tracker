import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        const existingEmail = await User.findOne({ where: { email } });
        if(existingEmail) {
            return res.status(400).json({ message: 'This email already exists'});
        }

        const existingName = await User.findOne({ where: { name } });
        if(existingName){
            return res.status(400).json({ message: 'This name already exists'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({ message: 'User created successfully', userId: newUser.id });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};