import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    // acquire User variables
    const {
        username,
        email,
        password,
        secretwish,
    } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        // create new entry in MongoGB via Prisma Client
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                secretwish,
            },
        });
        
        res.status(201).json({
            message: "User created successfully :D"
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to create user :("
        });
    }
}

export const login = async (req, res) => {
    //db operations
    const {
        email,
        password
    } = req.body;
    if (!email || !password) return res.status(401).json({message: "In this world, no important information should be left blank..."});

    try {
        // check if given email exists
        const user = await prisma.user.findUnique({
            where: {email}
        });
        if (!user) return res.status(401).json({message: "Invalid credentials"});

        // check if password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({message: "Invalid credentials"});

        // generate cookie
        // res.setHeader("Set-Cookie", "test=" + "myValue").json({message: "Congrats on passing Level 1!"}); // a JWT object
        const age = 1000 * 60 * 60 * 24 * 7; // 1 week
        const token = jwt.sign(
            {
                id: user.id,
            }, 
            process.env.JWT_SECRET_KEY, 
            {
                expiresIn: age
            }
        );

        const {password: userPassword, secretwish, ...userInfo} = user;

        // send cookie
        res.cookie("token", token, {
            httpOnly: true, // client-side JS cannot access cookie
            // secure: true, // commented out for Localhost
            sameSite: 'strict',
            maxAge: age,
        }).status(200).json({userInfo});

    } catch(err) {
        console.log(err);
        res.status(500).json({message: "Failed to login :("});
    }
}

export const logout = (req, res) => {
    res.clearCookie("token").status(200).json({message: "Logout successful"});
}