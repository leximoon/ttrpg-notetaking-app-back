import express  from "express";
import { PORT } from "../config";
import { userRouter } from "./routes/userRoutes";

const app = express();
app.use(express.json());
app.use(userRouter);

app.get("/", (request, response) => {
    response.send("Hello nerds!")
})




// last
app.listen(PORT, () => {
    console.log(`All is aye ok!`)
})