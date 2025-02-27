import { PrismaClient } from "@prisma/client";
import { Ticket } from "../model/Ticket";

const prisma = new PrismaClient();

export async function saveTicket(ticketData: Ticket) {
    try {
        const seats = Array.isArray(ticketData.seats) ? ticketData.seats.map(String) : [];
        const newTicket = await prisma.ticket.create({
            data: {
                movie: ticketData.movie,
                seats: seats.join(", "), // Store as a comma-separated string
                email: ticketData.email,
                phone: ticketData.phone,
             }
        });
        console.log("Ticket Saved:", newTicket);
        return newTicket;
    } catch (err) {
        console.error("Error saving ticket:", err);
        throw err;
    }
}

export async function getAllTickets() {
    try {
        return await prisma.ticket.findMany();
    } catch (err) {
        console.error("Error getting tickets:", err);
        throw err;
    }
}

export async function getTicketById(id: number) {
    try {
        return await prisma.ticket.findUnique({
            where: { id },
        });
    } catch (err) {
        console.error("Error getting ticket by ID:", err);
        throw err;
    }
}

export async function deleteTicket(id: number) {
    try {
        const deletedTicket = await prisma.ticket.delete({
            where: { id },
        });
        console.log("Ticket Deleted:", deletedTicket);
        return deletedTicket;
    } catch (err) {
        console.error("Error deleting ticket:", err);
        throw err;
    }
}
