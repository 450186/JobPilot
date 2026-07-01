import { Router } from "express";
import pool from "../db";

const router = Router();

router.get("/", async(req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM applications ORDER by deadline ASC NULLS LAST");
        res.json(result.rows);
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
        const result = await pool.query(
            `INSERT INTO applications (company, role, location, status, job_url, notes, salary, deadline) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *`,
            [company, role, location, status, job_url, notes, salary, deadline]
        );
        res.status(201).json(result.rows[0]);
        } catch (err) {
            console.log("Error creating application: ", err);
            res.status(500).json({ error: "Error creating application" });
        }
})

router.put('/:id', async (req, res) => {
    try {
        const {id} = req.params;
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
        const result = await pool.query(
            `UPDATE applications 
            SET company = $1, role = $2, location = $3, status = $4, job_url = $5, notes = $6, salary = $7, deadline = $8
            WHERE id = $9
            RETURNING *`,
            [company, role, location, status, job_url, notes, salary, deadline, id]
        );
        if(result.rows.length === 0) {
            return res.status(404).json({ error: "Application not found" });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.log("Error updating application: ", err);
        res.status(500).json({ error: "Error updating application" });
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const result = await pool.query("DELETE FROM applications WHERE id = $1 RETURNING *", [id]);
        if(result.rows.length === 0) {
            return res.status(404).json({ error: "Application not found" });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.log("Error deleting application: ", err);
        res.status(500).json({ error: "Error deleting application" });
    }
})

export default router;