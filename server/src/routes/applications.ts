import { Router } from "express";
import pool from "../db";

const router = Router();

router.get("/", async(req, res) => {
    try {
        const response = await pool.query("SELECT * FROM applications");
        res.json(response.rows);
    } catch (err) {
        console.log("Error fetching applications: ", err);
        res.status(500).json({ error: "Error fetching applications" });
    }
})

router.post('/', async(req, res) => {
    try {
        const {
            company,
            role, 
            location,
            status,
            job_url,
            notes,
            salary,
            deadline
        } = req.body;
        const response = await pool.query(
            `INSERT INTO applications (company, role, location, status, job_url, notes, salary, deadline) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *`,
            [company, role, location, status, job_url, notes, salary, deadline]
        );
        res.status(201).json(response.rows[0]);
        } catch (err) {
            console.log("Error creating application: ", err);
            res.status(500).json({ error: "Error creating application" });
        }
})

export default router;