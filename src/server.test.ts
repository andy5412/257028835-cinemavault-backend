import request from 'supertest';
import mongoose from 'mongoose';
import app from './server';

// 🌟 核心修復：加大 Jest 的超時等待時間至 15 秒
jest.setTimeout(15000);

beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(process.env.MONGO_URI || '');
    }
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('CinemaVault API Endpoints Testing', () => {
    
    // 🌟 幫 GET 測試後面加多個 15000 參數，等佢慢慢連線
    it('GET /api/movies should return 200 and an array', async () => {
        const res = await request(app).get('/api/movies');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    }, 15000);

    it('POST /api/movies without token should return 401 Unauthorized', async () => {
        const res = await request(app)
            .post('/api/movies')
            .send({ title: "Test", genre: "Action", year: "2026", rating: "8" });
        expect(res.statusCode).toEqual(401);
    });
});