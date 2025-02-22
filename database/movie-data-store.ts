import {PrismaClient} from "@prisma/client";
import {Movie} from "../model/Movie";

const prisma =new PrismaClient();

export async function MovieAdd(m: Movie) {
    try{
        const newMovie = await prisma.movie.create({
            data: {
                name: m.name,
                year: parseInt(m.year.toString()),  // Ensures m.year is a string
                image: Buffer.from('')
            }
        })
        console.log('Movie Added :', newMovie);
    }catch(err){
        console.log("error adding movie", err);
    }
}

export async function getAllMovies() {
    try{
        return await prisma.movie.findMany();
    }catch(err){
        console.log("error getting movies from prisma data",err);
    }
}

export async function MovieUpdate(id: string, m: Movie) {
    try{
        await prisma.movie.update({
            where: {id: parseInt(id)},
            data: {
                name: m.name,
                year: m.year,
                image: m.image
            }
        })
    }catch(err){
        console.log("error updating movie", err);
    }
}

export async function MovieDelete(id: string) {
    try{
        await prisma.movie.delete({
            where: {id: parseInt(id)}
        });
        console.log('Movie deleted :',id);
    }catch(err){
        console.log("error deleting movie", err);
    }
}