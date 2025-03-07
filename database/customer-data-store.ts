import {PrismaClient} from "@prisma/client";
import {Customer} from "../model/Customer";

const prisma =new PrismaClient();

export async function CustomerAdd(c: Customer ){
    try{
        const newCustomer  = await prisma.customer.create({
            data:{
                name: c.name,
                nic: c.nic,
                email: c.email,
                phone: c.phone
            }
        })
        console.log('Customer Added :',newCustomer)
    }catch(err) {
        console.log("error adding customer", err);
    }

}

export async function getAllCustomers(){
    try{
        return await prisma.customer.findMany();
    }catch(err){
        console.log("error getting customers from prisma data",err);
    }
}

export async function CustomerUpdate(email: string, c: Customer){
    try{
        await prisma.customer.update({
            where:{ email : c.email},
            data:{
                name: c.name,
                nic: c.nic,
                email: c.email,
                phone: c.phone

            }
        })
    }catch(err){
        console.log("error updating customer", err);
    }
}
export async function CustomerDelete(email: string) {
    try{
        await prisma.customer.delete({
            where: {email: email}
        });
        console.log('Customer deleted :',email);
    }catch(err){
        console.log("error deleting customer", err);
    }
}
