import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db";
import router from "./routes/applications";
import authRouter from "./routes/auth";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("JobPilot is Running!")
})
app.get('/health', (req, res) => {
    res.status(200).json({ status: "OK" })
})
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.log("DB connection failed: ", err)
    } else {
        console.log("DB connection successful")
        console.log(res.rows[0])
    }
})

app.use("/applications", router);
app.use("/auth", authRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})