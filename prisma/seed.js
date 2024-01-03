import { users } from './Users.js';
import { tasks } from './Tareas.js';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

async function main(){
    for (let user of users) {
        await prisma.usuarios.create({
            data: user
        })
    }
    for (let task of tasks) {
        await prisma.tareas.create({
            data: task
        })
    }
}

main().catch(e =>{
    console.log(e);
    process.exit(1);
}).finally(()=>{
    prisma.$disconnect();
})