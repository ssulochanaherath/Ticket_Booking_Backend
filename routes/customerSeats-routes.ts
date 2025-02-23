import { Router, Request, Response } from 'express';
import { getSeatsCustomers, saveSeatsCustomer } from '../database/customerSeats-data-store';

const router = Router();

// Get all seats customers
router.get('/view', async (req: Request, res: Response) => {
    try {
        const seatsCustomers = await getSeatsCustomers();
        res.json(seatsCustomers);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Unknown error occurred' });
        }
    }
});

// Add a new seats customer
router.post('/add', async (req: Request, res: Response): Promise<void> => {
    try {
        const { name } = req.body;
        if (!name) {
            res.status(400).json({ error: 'Name is required' } as { error: string });
            return; // No need to return the response object, just stop the function execution
        }
        const newCustomer = await saveSeatsCustomer(name);
        res.status(201).json(newCustomer);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Unknown error occurred' });
        }
    }
});




export default router;
