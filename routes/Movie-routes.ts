import express from "express";
import { Movie } from "../model/Movie";
import { MovieAdd, getAllMovies, MovieUpdate, MovieDelete } from "../database/movie-data-store";
import multer from "multer";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/add', upload.single('image'), async (req, res) => {
    try {
        const { name, year } = req.body;
        const image = req.file ? req.file.buffer : Buffer.from('');

        const movie: Movie = { id: 0, name, year: parseInt(year), image };
        await MovieAdd(movie);
        res.send('Movie Added');
    } catch (err) {
        console.error("Error adding movie:", err);
        res.status(400).send("Error adding movie");
    }
});

router.get('/view', async (req, res) => {
    try {
        const movies = await getAllMovies();
        res.json(movies);
    } catch (err) {
        console.error("Error getting movies:", err);
        res.status(500).send("Error fetching movies");
    }
});

router.put('/update/:id', upload.single('image'), async (req, res) => {
    try {
        const id = req.params.id;
        const { name, year } = req.body;
        const image = req.file ? req.file.buffer : undefined;

        const movie: Partial<Movie> = { name, year: parseInt(year), image };
        await MovieUpdate(id, movie);
        res.send('Movie Updated');
    } catch (err) {
        console.error("Error updating movie:", err);
        res.status(400).send("Error updating movie");
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        await MovieDelete(req.params.id);
        res.send('Movie Deleted');
    } catch (err) {
        console.error("Error deleting movie:", err);
        res.status(400).send("Error deleting movie");
    }
});

export default router;
