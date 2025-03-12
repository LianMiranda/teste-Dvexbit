import express from "express"
import { router } from "./routes/routes";
import { errorMiddleware } from "./middlewares/error.middleware";
import swaggerUi from "swagger-ui-express"
import swaggerDocs from "./swagger.json"

const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(router)
app.use(errorMiddleware);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.get("/", (_, res) => {res.send("API RODANDO! 🚀")});

export default app;