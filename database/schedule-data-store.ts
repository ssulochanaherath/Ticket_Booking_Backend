import {PrismaClient} from "@prisma/client";
import {Schedule} from "../model/Schedule";

const prisma =new PrismaClient();

export async function ScheduleAdd(s: Schedule ){
    try{
        const newSchedule  = await prisma.schedule.create({
            data:{
                name: s.name,
                time: s.time
            }

        })
        console.log('Schedule Added :',newSchedule)
    }catch(err) {
        console.log("error adding Schedule", err);
    }

}

export async function getAllSchedules(){
    try{
        return await prisma.schedule.findMany();
    }catch(err){
        console.log("error getting Schedules from prisma data",err);
    }
}

export async function ScheduleUpdate(name: string, s: Schedule) {
    try {
        await prisma.schedule.update({
            where: { name: name },  // Use name as the unique identifier
            data: {
                name: s.name,
                time: s.time,
            }
        });
    } catch (err) {
        console.log("Error updating Schedule", err);
    }
}

export async function ScheduleDelete(name: string) {
    try{
        await prisma.schedule.delete({
            where: {name : name}
        });
        console.log('Schedule deleted :',name);
    }catch(err){
        console.log("error deleting Schedule", err);
    }
}
