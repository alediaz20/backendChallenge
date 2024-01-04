import prisma from '../services/prismaService.js'

// Create
export const createUsuario = async (req, res) => {
    const { nombre } = req.body;
    try{
        const usuario = await prisma.usuarios.create({
            data: {
            nombre, //Falta asignar tareas
            },
        });
        res.send(usuario);
    }catch(e){
        res.send(e);
    }
};

// get all
export const getUsuarios = async (req, res) => {
    try{
        const usuarios = await prisma.usuarios.findMany();
        if(usuarios){
            res.send(usuarios);
        }else{
            res.send("No se encontraron usuarios para mostrar");
        }
    }catch(e){
        res.send(e);
    }
};

//get
export const getUsuario = async (req, res) => {
    const { id } = req.params;
    try{
        const usuario = await prisma.usuarios.findUnique({
            where: { id: Number(id) },
        });
        if(usuario){
            res.send(usuario);
        }else{
            res.send("No se encontró el usuario con id " + id);
        }
    }catch(e){
        res.send(e);
    }
};

//Update
export const updateUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    try{
        const usuario = await prisma.usuarios.update({
            where: { id: Number(id) },
            data: {
                nombre: nombre
            },
        });
        res.send(usuario);
    }catch(e){
        res.send("No se encontró el usuario con id " + id);
    }
};

//Delete
export const deleteUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await prisma.usuarios.delete({
            where: { id: Number(id) },
        });
        res.send("El usuario " + usuario.nombre + " ha sido eliminado");
    } catch (e) {
        res.send("No se encontro el usuario");
    }
};
