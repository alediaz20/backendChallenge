import fastify from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = fastify();


// Usuarios
// Create
app.post("/usuarios", async (req, res) => {
    const { nombre } = req.body;
    const usuario = await prisma.usuarios.create({
        data: {
            nombre   //Falta asignar tareas
        }
    })
    res.send(usuario);
})

// Read
app.get("/usuarios", async (req, res) => {
    const usuarios = await prisma.usuarios.findMany();
    res.send(usuarios);
});

app.get("/usuarios/:id", async (req, res) => {
    const { id } = req.params;
    const usuario = await prisma.usuarios.findUnique({
        where: { id: Number(id) }
    });
    res.send(usuario);
});

//Update
app.put('/usuarios/:id', async(req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    const usuario = usuarios.update({ 
        where: { id: id },
        data: { 
            nombre,
        },
    });
    res.send(usuario);
})



//Tareas
//Create
app.post("/tareas", async (req, res) => {
    const { texto, descripcion } = req.body;
    const tarea = await prisma.tareas.create({
        data: {
            texto,
            descripcion
        }
    })
    res.send(tarea);
})

//Read
app.get("/tareas", async (req, res) => {
    const tareas = await prisma.tareas.findMany();
    res.send(tareas);
});

app.get("/tareas/:id", async (req, res) => {
    const { id } = req.params;
    const tareas = await prisma.tareas.findUnique({
        where: { id: Number(id) }
    });
    res.send(tareas);
});

//Update























try {
    app.listen({ port: 3000 });
    console.log("Listen on port 3000")
} catch (error) {
    console.log(error);
}
