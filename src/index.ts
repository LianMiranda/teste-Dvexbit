import express from "express"
import { router } from "./routes/routes";
import { errorMiddleware } from "./middlewares/errorMiddle";

const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(router)
app.use(errorMiddleware)

export default app;