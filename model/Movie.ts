export class Movie {
    id: number;
    name: string;
    year: number;
    image?: Buffer;  // Made optional

    constructor(id: number, name: string, year: number, image?: Buffer) {
        this.id = id;
        this.name = name;
        this.year = Number(year); // Ensure it's always a number
        this.image = image ?? Buffer.from(''); // Default empty buffer
    }
}
