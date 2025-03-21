import express from "express";
import customerRoutes from "./routes/Customer-routes";
import movieRoutes from "./routes/Movie-routes";
import customerSeatsRoutes from "./routes/customerSeats-routes";
import scheduleRoutes from "./routes/Schedule-routes";
import userRoutes from "./routes/Signup-routes";
import ticketRoutes from "./routes/Ticket-routes";

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
app.use("/CustomerSeats",customerSeatsRoutes);
app.use("/Schedule",scheduleRoutes);
app.use("/User",userRoutes);
app.use("/Ticket",ticketRoutes);

app.listen(3000,(err=>{
    console.log("server port 3000") ;
}))