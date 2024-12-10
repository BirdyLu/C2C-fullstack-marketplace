import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch(err) {
        console.log(err);
        res.status(500).json({message: "fail to get users"});

    }
}

export const getUser = async (req, res) => {
    const id = await req.params.id;
    try {
        const user = await prisma.user.findUnique({
            where: {id},
        });
        res.status(200).json(user);
    } catch(err) {
        console.log(err);
        res.status(500).json({message: "fail to get users"});

    }
}

export const updateUser = async (req, res) => {
    const id = await req.params.id; // from URL
    const tokenUserID = req.userID; // from verifyToken.js
    const {password, ...inputs} = req.body;

    if (id !== tokenUserID) {
        return res.status(403).json({message: "Not Authorized!"});
    }

    let updatedPassword = null;
    try {
        if (password){
            updatedPassword = await bcrypt.hash(password, 10);
        }

        const updatedUser = await prisma.user.update({
            where: {id},
            data: {
                ...inputs,
                ...(updatedPassword && { password: updatedPassword }),
                ...(avatar && { avatar }), //last edited
            },
        });

        res.status(200).json({updatedUser});
    } catch(err) {
        console.log(err);
        res.status(500).json({message: "fail to get user"});

    }
}

export const deleteUser = async (req, res) => {
    try {
        res.status(200).json({message: "works"})
    } catch(err) {
        console.log(err);
        res.status(500).json({message: "fail to get users"});

    }
}
