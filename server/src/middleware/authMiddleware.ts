import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

type JwtPayload = {
    id: number,
    username: string,
    email: string
}

export interface AuthRequest extends Request {
    user?: JwtPayload
}

export const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;
    if(!authHeader) {
        return res.status(401).json({ error: "Unauthorized - no token" });
    }

    const token = authHeader.split(" ")[1];
    if(!token) {
        return res.status(401).json({ error: "Invalid token format" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid token" });
    }
}