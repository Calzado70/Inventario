import { config } from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import ruta from "./routes/index.js";
config();

const __filename = fileURLToPath(import.meta.url);
const __diranem = path.dirname(__filename);

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__diranem, "views"));
app.use(express.static(path.join(__diranem, "public")));
app.use(express.static("public"));

app.set("port", process.env.PORT || 3000);

app.use("/", ruta);


export default app;