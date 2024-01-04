import prisma from '../services/prismaService.js'
const estadosPermitidos = ["Sin asignar", "Asignada", "Iniciada", "Finalizada"];

//Create
export const createTarea = async (req, res) => {
    const { texto, descripcion } = req.body;
    const tarea = await prisma.tareas.create({
        data: {
        texto,
        descripcion,
        },
    });
    res.send(tarea);
};

//Read
export const getTareas = async (req, res) => {
    try { 
        const tareas = await prisma.tareas.findMany();
        if(tareas){
            res.send(tareas);
        }else{
            res.send("No se encontraron tareas para mostrar");
        }
    } catch (e) {
        res.send(e);
    }
};

export const getTarea = async (req, res) => {
    const { id } = req.params;
    try{
        const tarea = await prisma.tareas.findUnique({
            where: { id: Number(id) },
        });
        if(tarea){
            res.send(tarea);
        }else{
            res.send("No se encontro la tarea con id " + id);
        }
    }catch(e){
        res.send(e);
    }
};

//Modificar tarea
export const updateTarea = async (req, res) => {
    const { id } = req.params;
    const { texto, descripcion, estado } = req.body;
    let tarea;
    if(!estadosPermitidos.includes(estado)){
        res.send("El estado ingresado no es válido");
    }
    try{
        if (estado === "Sin asignar"){
            tarea = await prisma.tareas.update({
                where: { id: Number(id) },
                data: {
                    texto,
                    descripcion,
                    estado: estado,
                    usuarioId: null 
                },
            });
        }else{
            tarea = await prisma.tareas.update({
                where: { id: Number(id) },
                data: {
                    texto,
                    descripcion,
                    estado: estado,
                },
            });
        }
        res.send(tarea);
    }catch(e){
        res.send("No se encontro la tarea con id " + id);
    }
};


//Delete tarea
export const deleteTarea = async (req, res) => {
    const { id } = req.params;
    try {
        const tarea = await prisma.tareas.delete({
            where: { id: Number(id) },
        });
        res.send("la tarea " + tarea.id + " ha sido eliminada");
    } catch (e) {
        res.send("No se encontro la tarea");
    }
};


//Asignar tarea a usuario
export const assignTarea = async (req,res)=>{
    const { tareaId, usuarioId } = req.params;

    //Valido que la tarea no este asignada
    const EstadoTarea = await prisma.tareas.findFirst({
        where: {id: Number(tareaId)}
    });
    if(EstadoTarea.estado != "Sin asignar"){
        return res.code(400).send({ error: 'No es posible asignar la tarea, se encuentra en estado: ' + EstadoTarea.estado });
    }

    //Valido que el usuario no tenga 3 o mas tareas asignadas
    const tareasUsuario = await prisma.tareas.count({
        where: {usuarioId: Number(usuarioId) }
    });
    if(tareasUsuario >= 3){
        return res.code(400).send({ error: 'No es posible asignar la tarea, el usuario alcanzó el límite de tareas asignadas'});
    }

    // Actualizo la tarea
    const tareaActualizada = await prisma.tareas.update({
        where: {id: Number(tareaId)},
        data:{ usuarioId: Number(usuarioId),
                estado: "Asignada"        
        },
        include: {
            usuario: true
        }
    });
    
    return res.send(tareaActualizada);
};


// Summary
export const summary = async (req, res) => {
    try {
        // Obtengo todas las tareas
        const todasLasTareas = await prisma.tareas.findMany();
        
        // Obtengo el total de tareas
        const totalTareas = todasLasTareas.length;
        
        //Obtener cantidad de tareas por estado
        const tareasPorEstado = await prisma.tareas.groupBy({
            by: ['estado'],
            _count: {id: true },
        });

        // Calculo los porcentajes 
        const porcentajes = {};
        tareasPorEstado.forEach(tarea => {
            porcentajes[tarea.estado] = tarea._count.id / totalTareas 
        });

        // Devuelvo porcentajes 
        res.send(porcentajes);
    } catch (error) {
        console.error('Error al obtener el resumen de tareas:', error);
    }
};



