import express from "express";
import cors from "cors";
import helmet from "helmet";
import SIrouter from "./routes/auth/signin.js";
import SUrouter from "./routes/auth/signup.js";
import roomRouter from "./routes/room/createRoom.js";
import chatRouter from "./routes/chats/chat.js";

import config from "@repo/backend-common/config";

// Sort Cookies ...

const app = express();

console.log("Config :", config)

app.use(cors({
  origin: "http://localhost:300", // Allow all (or use your specific frontend URL)
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
app.use(helmet());
app.use(express.json());

app.use("/api/signin", SIrouter); 
app.use("/api/signup", SUrouter);
app.use("/api/room", roomRouter);
app.use("/api/chats", chatRouter);


app.get("/", (req, res) => {
  res.send("Working...");
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong" });
});

app.listen(config.PORT, () => {
  console.log(`App listening on ${config.PORT}...`);
});

