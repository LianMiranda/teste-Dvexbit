import express from "express"
import { router } from "./routes/routes";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(router)
app.use(errorMiddleware);

app.get("/", (_, res) => {res.send("API RODANDO! 🚀")});

export default app;