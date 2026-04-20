import { generateToken } from "../config/jwtProvider.js";
import { createUser, getUserByEmail } from "../services/userService.js";
import bcrypt from 'bcrypt';

export const register = async(req,res) => {
    try {
        const user = await createUser(req.body);
        const jwt = generateToken(user._id);
        // await createCart(user);
        return res.status(201).send({jwt,messagr:"register success"})
    } catch (error) {
        return res.status(500).send({error:error.message});
    }
}

export const login = async(req,res) => {
    const {email,password} = req.body;
    try {
        const user = await getUserByEmail(email);

        const isPasswordValid = await bcrypt.compare(password,user.password);

        if(!isPasswordValid)
            return res.status(401).send({message:"Invalid Password"});

        const jwt = generateToken(user._id);
        return res.status(200).send({jwt,message:"Login Success"});

    } catch (error) {
        return res.status(500).send({error:error.message});
    }
}