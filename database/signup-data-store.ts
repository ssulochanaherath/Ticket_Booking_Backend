import { PrismaClient } from '@prisma/client';
import { SignupModel } from '../model/Signup';

const prisma = new PrismaClient();

// Add this function to your signup-data-store.ts
export async function getUserRoleByEmail(email: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { email: email },
            select: { role: true },  // Only fetch the role
        });

        if (user) {
            return user.role;  // Return the role if found
        } else {
            throw new Error('User not found');
        }
    } catch (error) {
        console.error('Error fetching user by email:', error);
        throw error;
    }
}

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
