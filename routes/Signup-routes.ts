import express, { Request, Response, NextFunction } from "express"; // Import NextFunction
import { SignupModel } from "../model/Signup";
import { AddUser} from "../database/signup-data-store";

const router = express.Router();

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
