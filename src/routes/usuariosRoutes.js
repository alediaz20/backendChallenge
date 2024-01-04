import * as usuariosController from '../controllers/usuariosController.js';

export default (app) => {
    app.post("/usuarios", usuariosController.createUsuario);
    app.get("/usuarios", usuariosController.getUsuarios);
    app.get("/usuarios/:id", usuariosController.getUsuario);
    app.put("/usuarios/:id", usuariosController.updateUsuario);
    app.delete("/usuarios/:id", usuariosController.deleteUsuario);
};