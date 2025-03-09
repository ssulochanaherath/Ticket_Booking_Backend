import { Router } from "express";
import { saveTicket, getAllTickets, getTicketById, deleteTicket } from "../database/ticket-data-store";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const router = Router();

router.post("/add", async (req, res) => {
    const { movie, seats, email, phone } = req.body;
    try {
        const newTicket = await saveTicket({ movie, seats, email, phone });
        res.status(201).json(newTicket);
    } catch (error) {
        console.error("Error creating ticket:", error);
        res.status(500).json({ error: "Failed to create ticket." });
    }
});

router.get("/view", async (req, res) => {
    try {
        const tickets = await getAllTickets();
        res.status(200).json(tickets);
    } catch (error) {
        console.error("Error fetching tickets:", error);
        res.status(500).json({ error: "Failed to fetch tickets." });
    }
});

router.get("/view/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const ticket = await getTicketById(parseInt(id));
        if (ticket) {
            res.status(200).json(ticket);
        } else {
            res.status(404).json({ error: "Ticket not found." });
        }
    } catch (error) {
        console.error("Error fetching ticket:", error);
        res.status(500).json({ error: "Failed to fetch ticket." });
    }
});

router.delete("/reset", async (req, res) => {
    try {
        await prisma.ticket.deleteMany();
        res.status(200).json({ message: "All tickets have been deleted." });
    } catch (error) {
        console.error("Error resetting tickets:", error);
        res.status(500).json({ error: "Failed to reset tickets." });
    }
});

export default router;
