import express, { Request, Response, NextFunction } from "express"; // Import NextFunction
import { SignupModel } from "../model/Signup";
import { AddUser, getUserRoleByEmail} from "../database/signup-data-store";

const router = express.Router();

router.get('/role/:email', async (req: Request, res: Response) => {
    try {
        const { email } = req.params;
        const role = await getUserRoleByEmail(email); // Call the function to get role
        res.json({ role }); // Return the role
    } catch (error) {
        console.error('Error fetching role:', error);
        res.status(400).send("Error fetching role");
    }
});


router.post('/add', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: SignupModel = req.body;
        const addedUser = await AddUser(user);
        res.send('User Added')
    } catch (err) {
        console.log("error adding user", err);
        res.status(400).send("error adding user");
    }
});

export default router;
