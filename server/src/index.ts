import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db";
import router from "./routes/applications";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("JobPilot is Running!")
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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})