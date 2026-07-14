import "dotenv/config";
import app from "./app.js";
import connectDB from "./src/db/db.js";

const port = process.env.PORT;

connectDB()
    .then(()=>{
        app.listen(port, ()=>{
        console.log(`The server is listening on port : ${port}`);
        });

    })
    .catch((error)=>{
        console.error("Failed connecting to DB")
    })
