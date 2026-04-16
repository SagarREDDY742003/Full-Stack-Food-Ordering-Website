import app from "./app.js";
import {connectDb} from "./config/db.js"

const port = 5454

app.listen(port, async()=>{
    await connectDb();
    console.log(`Server running on port ${port}`);
})