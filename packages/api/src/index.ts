import express from "express";
import routes from "./routes/loan-router";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use("/api", routes);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
