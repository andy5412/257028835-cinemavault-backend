import express from 'express';
import { getMovies, createMovie, deleteMovie } from '../controllers/movieController';

const router = express.Router();

router.get('/', getMovies);
router.post('/', createMovie);
router.delete('/:id', deleteMovie);

export default router;