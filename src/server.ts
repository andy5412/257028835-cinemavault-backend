import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import authRoutes from './routes/authRoutes';
import movieRoutes from './routes/movieRoutes';

// 🌟 1. 重新加返 Swagger 嘅 Import
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json'; 

dotenv.config();

const PORT = 8080;
const app = express();

// Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Connect to Database
connectDB();

// 🌟 2. 啟動 Swagger API 文件網頁
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);

// Start Server
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
        // 🌟 3. 提你個 API 文件條 Link 喺邊
        console.log(`📄 API Documentation available at http://localhost:${PORT}/api-docs`);
    });
}

export default app;