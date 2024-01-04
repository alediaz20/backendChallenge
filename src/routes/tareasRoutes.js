import * as tareasController from '../controllers/tareasController.js';

export default (app) => {
    app.post("/tareas", tareasController.createTarea);
    app.get("/tareas", tareasController.getTareas);
    app.get("/tareas/:id", tareasController.getTarea);
    app.put("/tareas/:id", tareasController.updateTarea);
    app.put("/tareas/:tareaId/usuarios/:usuarioId", tareasController.assignTarea);
    app.delete("/tareas/:id", tareasController.deleteTarea);
    app.get("/summary", tareasController.summary);
};