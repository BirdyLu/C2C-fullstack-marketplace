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
        res.status(500).json({message: "fail to get this user"});

    }
}

export const updateUser = async (req, res) => { // updates user profile in database
    const id = await req.params.id; // from URL
    const tokenUserID = req.userID; // from verifyToken.js
    const {username, email, ...rest} = req.body;

    if (id !== tokenUserID) {
        return res.status(403).json({message: "Not Authorized!"});
    }

    // let updatedPassword = null;
    try {
        // if (password){
        //     updatedPassword = await bcrypt.hash(password, 10);
        // }

        const updatedUser = await prisma.user.update({
            where: {id},
            data: {
                // ...inputs,
                // ...(updatedPassword && { password: updatedPassword }), // if there is updatedPassword, use it as password
                // ...(avatar && { avatar }), // https://www.youtube.com/watch?v=eJ3YysWaP_A&t=2h2m46s
                ...(username && { username }), // update username if provided
                ...(email && { email }),
                ...rest,
            },
        });

        // const {password: sdafafsd, ...rest } = updatedUser; // why can't name it password?
        // const { username: updatedUsername, email: updatedEmail} = updatedUser; // extract from updatedUser; rename username to updatedUsername, not assign. 

        res.status(200).json(updatedUser); // assign updatedUsername to username, which is a key in the newly created JSON object. 

    } catch(err) {
        console.log(err);
        res.status(500).json({message: "fail to update user"});

    }
}

export const deleteUser = async (req, res) => {
    const id = await req.params.id; // from URL
    const tokenUserID = req.userID; // from verifyToken.js

    if (id !== tokenUserID) {
        return res.status(403).json({message: "Not Authorized!"});
    }

    try {
        await prisma.user.delete({
            where: {id},
        });
        res.status(200).json({message: "User deleted"});
    } catch(err) {
        console.log(err);
        res.status(500).json({message: "fail to delete user"});

    }
}
