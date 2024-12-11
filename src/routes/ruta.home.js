import { Router } from "express";
import { inventario } from "../controllers/home.controller.js";


const rutaHome = Router();

rutaHome.get("/", inventario);




export default rutaHome;