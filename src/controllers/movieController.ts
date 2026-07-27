import { Request, Response } from 'express';
import { Movie } from '../models/Movie';

/**
 * Retrieves movies from the database with optional search filters.
 * @param req Express request object containing query parameters.
 * @param res Express response object.
 */
export const getMovies = async (req: Request, res: Response) => {
    const { title, genre, year } = req.query;
    let query: any = {};
    if (title) query.title = { $regex: title, $options: 'i' };
    if (genre) query.genre = { $regex: genre, $options: 'i' };
    if (year) query.year = year;

    try {
        const movies = await Movie.find(query);
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

/**
 * Creates a new movie entry in the database.
 * @param req Express request object containing movie details.
 * @param res Express response object.
 */
export const createMovie = async (req: Request, res: Response) => {
    const { title, genre, year, rating, director, duration, description, poster } = req.body;
    try {
        const newMovie = new Movie({ title, genre, year, rating, director, duration, description, poster });
        await newMovie.save();
        res.status(201).json(newMovie);
    } catch (err) {
        res.status(400).json({ message: 'Invalid data' });
    }
};

/**
 * Deletes a movie by its ID.
 * @param req Express request object containing movie ID in parameters.
 * @param res Express response object.
 */
export const deleteMovie = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await Movie.findByIdAndDelete(id);
        res.json({ message: 'Movie deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: 'Delete failed' });
    }
};