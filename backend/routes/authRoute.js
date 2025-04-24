import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; 

const router = express.Router();

const JWT_SECRET = 'jackrussel'; 

router.post('/register', async (req, res) => {
    const { username, email, password, phone, city } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Потребител с този email вече съществува!' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            phone,
            city,
            profileImage: 'https://example.com/default-profile-image.jpg' // Стойност по подразбиране за профилната снимка
        });

        await newUser.save();
        res.status(201).json({ message: 'Потребителят беше създаден успешно!' });
    } catch (error) {
        res.status(500).json({ message: 'Грешка при създаване на потребителя!' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Невалиден email или парола!' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Невалиден email или парола!' });

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Успешен вход!', token });
    } catch (error) {
        res.status(500).json({ message: 'Грешка при входа!' });
    }
});

export default router;
