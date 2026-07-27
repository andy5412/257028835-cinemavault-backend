import mongoose from 'mongoose';
import { Movie } from '../models/Movie';
import dotenv from 'dotenv';

dotenv.config();
const MONGO_URI = process.env.MONGO_URI || '';

/**
 * Connects to MongoDB and seeds initial movie data.
 */
export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ MongoDB Connected');
        
        await Movie.deleteMany({});
        console.log('🧹 舊電影數據已清空');

        const seedMovies = [
            {
                title: "Inception (盜夢空間)",
                genre: "Action",
                year: "2010",
                rating: "8.8",
                director: "Christopher Nolan",
                duration: "148 mins",
                description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
                poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500"
            },
            {
                title: "The Dark Knight (蝙蝠俠：黑夜之神)",
                genre: "Action",
                year: "2008",
                rating: "9.0",
                director: "Christopher Nolan",
                duration: "152 mins",
                description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
                poster: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=500"
            },
            {
                title: "Interstellar (星際啟示錄)",
                genre: "Drama",
                year: "2014",
                rating: "8.7",
                director: "Christopher Nolan",
                duration: "169 mins",
                description: "When Earth becomes uninhabitable, a team of explorers travels through a wormhole in space in an attempt to ensure humanity's survival.",
                poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500"
            },
            {
                title: "Spirited Away (千與千尋)",
                genre: "Drama",
                year: "2001",
                rating: "8.6",
                director: "Hayao Miyazaki",
                duration: "125 mins",
                description: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
                poster: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500"
            },
            {
                title: "The Hangover (醉爆伴郎團)",
                genre: "Comedy",
                year: "2009",
                rating: "7.7",
                director: "Todd Phillips",
                duration: "100 mins",
                description: "Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing.",
                poster: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=500"
            },
            {
                title: "Free Solo (徒手攀岩)",
                genre: "Documentary",
                year: "2018",
                rating: "8.1",
                director: "Elizabeth Chai Vasarhelyi",
                duration: "100 mins",
                description: "Alex Honnold attempts to conquer the first ever free solo climb of the famed 3,000-foot El Capitan's wall in Yosemite National Park.",
                poster: "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=500"
            }
        ];
        
        await Movie.insertMany(seedMovies);
        console.log('🌟 6 套豪華神級電影數據已 100% 強制注入資料庫！');
    } catch (err) {
        console.error('❌ MongoDB Connection Error:', err);
    }
};