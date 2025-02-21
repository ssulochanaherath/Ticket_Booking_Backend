import express from "express";
import {Customer} from "../model/Customer";
import {CustomerAdd, CustomerDelete, CustomerUpdate, getAllCustomers} from "../database/customer-data-store";

const router = express.Router();

router.post('/add',async (req,res,next)=>{
    console.log(req.body);

    const customer: Customer= req.body;
    try{
        const addedCustomer = await CustomerAdd(customer);
        res.send('Customer Added')
    }catch(err){
        console.log("error adding customer", err);
        res.status(400).send("error adding customer");
    }
})

router.get('/view',async (req,res,next)=>{

    try{
        const customers=  await getAllCustomers();
        res.json(customers);
    }catch(err){
        console.log("error getting customers", err);
    }

})

router.put('/update/:email',async (req,res,next)=>{
    const email: string = req.params.email;
    const customer : Customer = req.body;

    try{
        await CustomerUpdate(email, customer);
        res.send('Customer Updated');
        console.log("customer updated");

    }catch(err){
        console.log("error updating customer", err);
    }

})

router.delete('/delete/:email',async (req,res,next)=>{

    const email  = req.params.email;
    try{
        await CustomerDelete(email);
        res.send('Customer Deleted');
        console.log("customer updated");

    }catch(err){
        console.log("error deleting customer", err);
    }
})

export default router;