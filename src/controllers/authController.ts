import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

/**
 * Registers a new admin user.
 * @param req Express request object containing username and password.
 * @param res Express response object.
 */
export const register = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (err) {
        res.status(400).json({ message: 'Username already exists or invalid data' });
    }
};

/**
 * Authenticates a user and issues a JWT token.
 * @param req Express request object containing username and password.
 * @param res Express response object.
 */
export const login = async (req: Request, res: Response): Promise<any> => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET || 'fallback', { expiresIn: '2h' });
    res.json({ token });
};