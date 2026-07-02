import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db";

const router = Router();

router.post('/register', async (req, res) => {
    try {
        const {
            first_name,
            last_name,
            username,
            email,
            password
        } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const result = await pool.query(
            `INSERT INTO users 
            (first_name, last_name, username, email, password_hash)
            VALUES 
            ($1, $2, $3, $4, $5)
            RETURNING id, first_name, last_name, username, email`,
            [first_name, last_name, username, email, hashedPassword]
        );
        const user = result.rows[0];
        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                email: user.email,
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: "1h",
            }
        );
        res.status(201).json({
            token,
            user
        })
    }catch (err) {
        console.error(err);

        res.status(500).json({
            error: "Error registering user",
        });
    }
})

router.post('/login', async (req, res) => {
    try {
        const {
            username,
            password
        } = req.body

        const result = await pool.query(
            `SELECT * FROM users WHERE username = $1`,
            [username]
        );

        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({
                error: "Invalid username or password",
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password_hash);

        if (!passwordMatch) {
            return res.status(401).json({
                error: "Invalid username or password",
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                email: user.email,
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: "1h",
            }
        );

        res.status(200).json({
            token,
            user: {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                username: user.username,
                email: user.email,
            }
        })
    } catch (err) {
        console.error("Error logging in: ", err);
        res.status(500).json({
            error: "Error logging in",
        });
    }
})

export default router