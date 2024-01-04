import fastify from "fastify";
import usuariosRoutes from "./src/routes/usuariosRoutes.js";
import tareasRoutes from "./src/routes/tareasRoutes.js";

const app = fastify();


usuariosRoutes(app);
tareasRoutes(app);


try {
    app.listen({ port: 3000 });
    console.log("Listen on port 3000");
} catch (error) {
    console.log(error);
}
