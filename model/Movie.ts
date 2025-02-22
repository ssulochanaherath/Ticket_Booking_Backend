export class Movie {
    id: number;
    name: string;
    year: number;
    image: Buffer;  // Change from Uint8Array to Buffer

    constructor(id: number, name: string, year: number, image: Buffer) {
        this.id = id;
        this.name = name;
        this.year = year;
        this.image = image;
    }
}