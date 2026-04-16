
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import { getUserIdFromToken } from '../config/jwtProvider.js';

export const createUser = async(userData) => {
    try {
        let {fullName,email,password,role} = userData;
        const isUserExist = await User.findOne({email:email})

        if(isUserExist){
            throw new Error("User already exists with email");
        }

        password = await bcrypt.hash(password, 8);

        const user = await User.create({
            fullName,
            email: email,
            password:password,
            role
        });

        return user;

    } catch (error) {
        throw new Error(error.message);
    }
};

export const getUserByEmail = async(email) => {
    try {
        const user = await User.findOne({email:email});
        if(!user){
            throw new Error("User not found");
        }
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const findUserById = async(userId) => {
    try {
        const user = await User.findById(userId).populate("addresses");
        if(!user){
            throw new Error("User not found with id - ",userId);
        }
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const findUserProfileByJwt = async(jwt) => {
    try {
        const userId = getUserIdFromToken(jwt) ;
        const user = await findUserById(userId);
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const findAllUsers = async() => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw new Error(error.message);
    }
}