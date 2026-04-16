const {app} = require("./app.js");
const connectDb = require("./config/db.js");

const port = 5454

app.listen(port, async()=>{
    await connectDb();
})