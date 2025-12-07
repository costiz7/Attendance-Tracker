import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//This is our register controller
export const register = async (req, res) => {
    try {
        //take user data from request
        const { name, email, password } = req.body;
        
        //verify if the email already exists
        const existingEmail = await User.findOne({ where: { email } });
        if(existingEmail) {
            return res.status(400).json({ message: 'This email already exists'});
        }

        //verify if the name already exists
        const existingName = await User.findOne({ where: { name } });
        if(existingName){
            return res.status(400).json({ message: 'This name already exists'});
        }

        //We hashin' their password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create our user instance in the table
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        //send them a nice status
        res.status(201).json({ message: 'User created successfully', userId: newUser.id });
    } catch (error) {
        //send them an ugly status
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        //get their data (the one who's trying to login)
        const { email, password } = req.body;

        //we look if their credentials exist
        const user = await User.findOne({ where: { email } });
        if(!user) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        //check if their password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.'});
        }

        //we give them an 'authorization wristband' for their entrance in our festival, so we don't request their credentials everytime they want to do something
        const token = jwt.sign(
            { id: user.id, name: user.name},
            process.env.JWT_SECRET || 'temporary_secret',
            { expiresIn: '1d' }
        );

        //send to the frontend the user's wristband (token) and their info
        res.status(201).json({
            token,
            user: { id: user.id, name: user.name, email: user.email }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}