import * as controllers from "./controllers.js";
import * as schemas from "./schemas.js";

async function BookRoutes(server, options) {
  server.route({
    method: "POST",
    url: "/login",
    schema: schemas.LoginSchema,
    handler: controllers.LoginController,
  });

  server.route({
    method: "POST",
    url: "/register",
    schema: schemas.RegisterSchema,
    handler: controllers.RegisterController,
  });

  server.route({
    method: "POST",
    url: "/books",
    schema: schemas.AddBookSchema,
    handler: controllers.AddBookController,
  });

  server.route({
    method: "GET",
    url: "/books",
    preHandler: [server.authenticate],
    schema: schemas.GetBooksSchema,
    handler: controllers.GetBooksController,
  });

  server.route({
    method: "DELETE",
    url: "/books",
    schema: schemas.DeleteBookSchema,
    handler: controllers.DeleteBookController,
  });

  server.route({
    method: "GET",
    url: "/chat",
    handler: (req, res) =>
      res.send("This endpoint is intended for websocket use only!"),
    wsHandler: (connection, request) => controllers.ChatSocketController(connection, request, server),
  });
}

export default BookRoutes;
