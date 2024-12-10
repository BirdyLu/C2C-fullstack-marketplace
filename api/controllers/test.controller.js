import jwt from "jsonwebtoken";

export const shouldBeLoggedIn = async (req, res) => {
    console.log(req.userID);
    
    const token = req.cookies.token;

    if (!token) return res.status(401).json({message: "Not Authenticated!"});

    // decrypt client cookie using the key.
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (err) return res.status(401).json({message: "Token Invalid!"});
    }); // async function for call back function.
    return res.status(200).json({message: "You're authenticated :)"});
}

export const shouldBeAdmin = async (req, res) => {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({message: "Not Authenticated!"});

    // decrypt client cookie using the key.
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (err) return res.status(401).json({message: "Token Invalid!"});
        if (!payload.isAdmin) return res.status(403).json({message: "Not Admin!"});
    }); // async function for call back function.

    res.status(200).json({message: "You're Authenticated."});
}