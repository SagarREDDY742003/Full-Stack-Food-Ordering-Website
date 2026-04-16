import { createUser } from "../services/userService.js";

const register = async(req,res) => {
    try {
        const user = await createUser(req.body);
    } catch (error) {
        
    }
}