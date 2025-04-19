const express = require("express");
const app = express();
<<<<<<< Updated upstream
const path = require("path");
const router = require("./app/routes/userRoutes");
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));
=======
const userRoutes = require("./app/routes/userRoutes");
const bodyParser = require("body-parser");
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(userRoutes);
>>>>>>> Stashed changes

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Gerenciador de Tarefas",
      version: "1.0.0",
      description: "Documentação de rotas da API do Gerenciador de Tarefas",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"], // Define onde estão as anotações do Swagger (no mesmo arquivo, por exemplo)
};

const specs = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));