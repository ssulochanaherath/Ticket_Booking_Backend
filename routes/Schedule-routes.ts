import express from "express";
import {Schedule} from "../model/Schedule";
import {ScheduleAdd, ScheduleDelete, ScheduleUpdate, getAllSchedules} from "../database/schedule-data-store";

const router = express.Router();

router.post('/add',async (req,res,next)=>{
    console.log(req.body);

    const schedule: Schedule= req.body;
    try{
        const addedCustomer = await ScheduleAdd(schedule);
        res.send('Customer Added')
    }catch(err){
        console.log("error adding customer", err);
        res.status(400).send("error adding customer");
    }
})

router.get('/view',async (req,res,next)=>{

    try{
        const schedule=  await getAllSchedules();
        res.json(schedule);
    }catch(err){
        console.log("error getting customers", err);
    }

})

router.put('/update/:name', async (req, res, next) => {
    const name: string = req.params.name; // Corrected variable name
    const schedule: Schedule = req.body;

    try {
        await ScheduleUpdate(name, schedule); // 'name' is now defined
        res.send('Schedule Updated');
        console.log("Schedule updated");
    } catch (err) {
        console.log("Error updating schedule", err);
    }
});


router.delete('/delete/:name',async (req,res,next)=>{

    const name  = req.params.name;
    try{
        await ScheduleDelete(name);
        res.send('Customer Deleted');
        console.log("customer updated");

    }catch(err){
        console.log("error deleting customer", err);
    }
})

export default router;