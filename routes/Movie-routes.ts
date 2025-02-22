import express from "express";
import {Movie} from "../model/Movie";
import {MovieAdd, getAllMovies, MovieUpdate, MovieDelete} from "../database/movie-data-store";
import multer from "multer";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/add',async (req,res,next)=>{
    console.log(req.body);

    const movie: Movie= req.body;
    try{
        const addedMovie = await MovieAdd(movie);
        res.send('Movie Added')
    }catch(err){
        console.log("error adding movie", err);
        res.status(400).send("error adding movie");
    }
})


router.get('/view',async (req,res,next)=>{

    try{
        const movies=  await getAllMovies();
        res.json(movies);
    }catch(err){
        console.log("error getting movies", err);
    }
})

router.put('/update/:name',async (req,res,next)=>{
    const name: string= req.params.name;
    const movie: Movie= req.body;
    try{
        await MovieUpdate(name,movie);
        res.send('Movie Updated')
        console.log('Movie Updated');
    }catch(err){
        console.log("error updating movie", err);
        res.status(400).send("error updating movie");
    }
})

router.delete('/delete/:name',async (req,res,next)=>{
    const name: string= req.params.name;
    try{
        await MovieDelete(name);
        res.send('Movie Deleted')
        console.log('Movie Deleted');
    }catch(err){
        console.log("error deleting movie", err);
    }
})

export default router