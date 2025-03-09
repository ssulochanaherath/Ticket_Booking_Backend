import { PrismaClient } from "@prisma/client";
import { Movie } from "../model/Movie";

const prisma = new PrismaClient();

export async function MovieAdd(m: Movie) {
    try {
        const newMovie = await prisma.movie.create({
            data: {
                name: m.name,
                year: parseInt(m.year.toString()),
                image: m.image ? new Uint8Array(m.image) : new Uint8Array() // Convert Buffer to Uint8Array
            }
        });
        console.log("Movie Added:", newMovie);
    } catch (err) {
        console.log("Error adding movie", err);
    }
}

export async function getAllMovies() {
    try {
        const movies = await prisma.movie.findMany();
        return movies.map(movie => ({
            ...movie,
            image: movie.image ? `data:image/jpeg;base64,${Buffer.from(movie.image).toString('base64')}` : null
        }));
    } catch (err) {
        console.log("Error getting movies from database", err);
        throw err;
    }
}


export async function MovieUpdate(id: string, m: Partial<Movie>) {
    try {
        const updatedMovie = await prisma.movie.update({
            where: { id: parseInt(id) },
            data: {
                name: m.name,
                year: m.year ? parseInt(m.year.toString()) : undefined,
                image: m.image ? m.image : undefined // Update image only if provided
            }
        });
        console.log("Movie Updated:", updatedMovie);
        return updatedMovie;
    } catch (err) {
        console.error("Error updating movie", err);
        throw err;
    }
}

export async function MovieDelete(id: string) {
    try {
        await prisma.movie.delete({ where: { id: parseInt(id) } });
        console.log("Movie Deleted:", id);
    } catch (err) {
        console.error("Error deleting movie", err);
        throw err;
    }
}
