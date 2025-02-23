import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getSeatsCustomers = async () => {
    try {
        return await prisma.seatsCustomer.findMany();
    } catch (error) {
        throw new Error('Error fetching seats customers');
    }
};

export const saveSeatsCustomer = async (name: string) => {
    try {
        return await prisma.seatsCustomer.create({
            data: {
                name,
            },
        });
    } catch (error) {
        throw new Error('Error saving seats customer');
    }
};
