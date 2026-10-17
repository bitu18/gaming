import express from "express";
import cors from "cors";
import "dotenv/config";
import http from "http";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.route.js";

const app = express();
const PORT = 5000;

// DB
connectDB();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.get("/", (req, res) => {
  res.send("API WORKING");
});

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
