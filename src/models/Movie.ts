import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    genre: { type: String, required: true },
    year: { type: String, required: true },
    rating: { type: String, required: true },
    director: { type: String, default: 'Unknown' },
    duration: { type: String, default: 'N/A' },
    description: { type: String, default: 'No description available.' },
    poster: { type: String, default: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500' }
});

export const Movie = mongoose.model('Movie', movieSchema);