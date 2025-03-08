import { router } from "../routes/routes";
import app from "..";

const port = 3000;

app.use(router)

app.listen(port, () => console.log(`Server is running in port ${port}`));

