import { initExpress, initLoadEnv } from "./config";

// Load Env File
initLoadEnv();

// Load Express Server
const server = initExpress();
