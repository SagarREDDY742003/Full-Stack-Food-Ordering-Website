import { getUserIdFromToken } from "../config/jwtProvider.js";
import { findUserById } from "../services/userService.js";

export const authenticate = async(req,res,next) => {
    // Bearer token
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if(!token) 
            return res.status(401).json({message:"No token provided."})
        
        const userId = getUserIdFromToken(token);
        const user = await findUserById(userId);
        req.user=user;
    } catch (error) {
        return res.status(401).json({error:error.message});
    }
    next();
}