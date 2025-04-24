import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: 'Достъп до защитен маршрут!', user: req.user });
});

export default router;
