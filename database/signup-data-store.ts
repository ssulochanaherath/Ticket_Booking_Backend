import { PrismaClient } from '@prisma/client';
import { SignupModel } from '../model/Signup';

const prisma = new PrismaClient();

export async function AddUser(user: SignupModel) {
    try {
        const newUser = await prisma.user.create({
            data: {
                email: user.email,
                password: user.password,
                role: user.role,
            },
        });
        console.log('User added:', newUser);
        return newUser;
    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
}
