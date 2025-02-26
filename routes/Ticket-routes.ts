import { Router } from "express";
import { saveTicket, getAllTickets, getTicketById, deleteTicket } from "../database/ticket-data-store";

const router = Router();

// Create a new ticket
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

// Get all tickets
router.get("/view", async (req, res) => {
    try {
        const tickets = await getAllTickets();
        res.status(200).json(tickets);
    } catch (error) {
        console.error("Error fetching tickets:", error);
        res.status(500).json({ error: "Failed to fetch tickets." });
    }
});

// Get a specific ticket by id
router.get("/update/:id", async (req, res) => {
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

// Delete a ticket by id
router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTicket = await deleteTicket(parseInt(id));
        res.status(200).json(deletedTicket);
    } catch (error) {
        console.error("Error deleting ticket:", error);
        res.status(500).json({ error: "Failed to delete ticket." });
    }
});

export default router;
