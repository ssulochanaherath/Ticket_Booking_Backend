import { Router, Request, Response } from 'express';
import {getSeatsCustomers, resetSeatsCustomers, saveSeatsCustomer} from '../database/customerSeats-data-store';

const router = Router();

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

router.delete('/reset', async (req: Request, res: Response) => {
    try {
        await resetSeatsCustomers();
        res.json({ message: 'All booked seats have been reset' });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Unknown error occurred' });
        }
    }
});

export default router;