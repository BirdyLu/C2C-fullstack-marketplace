/**
 * Check if cookie exists && belongs. If true, pass on the userID decrypted from cookie. 
 */

import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({message: "Not Authenticated!"});

    // decrypt client cookie using the key.
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => { // payload is whatever encoded in token. 
        if (err) return res.status(401).json({message: "Token Invalid!"});
        req.userID = payload.id;
        next();
    }); // async function for call back function.
}