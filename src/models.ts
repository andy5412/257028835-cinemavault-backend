import mongoose from 'mongoose';

// 管理員 Schema
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// 電影 Schema (包含 Title, Genre, Year, Rating 篩選欄位)
const MovieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    genre: { type: String, required: true },
    year: { type: String, required: true },
    rating: { type: String, required: true }
});

export const User = mongoose.model('User', UserSchema);
export const Movie = mongoose.model('Movie', MovieSchema);