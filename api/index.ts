import app from "../src/app"; 
import { createServer } from "http";

const server = createServer(app);

export default server;