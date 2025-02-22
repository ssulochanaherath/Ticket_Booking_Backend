import express from "express";
import customerRoutes from "./routes/Customer-routes";
import movieRoutes from "./routes/Movie-routes";

const app = express();
var cors = require("cors")

app.use(express.json());
app.use(cors());

const corsOption={
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
}
app.use(cors(corsOption));

app.use("/Customer",customerRoutes);
app.use("/Movie",movieRoutes);

app.listen(3000,(err=>{
    console.log("server port 3000") ;
}))