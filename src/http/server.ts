import app from "..";

const port = process.env.API_PORT;

app.listen(port, () => console.log(`Server is running in port ${port}`));

