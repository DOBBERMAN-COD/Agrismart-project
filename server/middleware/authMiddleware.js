import jwt from "jsonwebtoken";

export function protect(req, res, next) {
    try {
        //1. Read the JWT  from teh HTTP-only cookie
        const token = req.cookies?.token;

        if(!token) {
            return res.status(401).json({
                message: "Authentication required. Please log in .",
            });
        }

        // 2. Verify the token's signature and expiration
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. Attach the verified identity to the request 
        req.user = {
            userId : decoded.userId,
            role: decoded.role,
        };

        //4. Allow the request to continue
        next();
    } catch (error) {
        if(error.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "Your session has expired .Please log in again.",
            });
        }

        return res.status(401).json({
            message: "Invalid authentication token. Please log in again.",
        });
    }
}
