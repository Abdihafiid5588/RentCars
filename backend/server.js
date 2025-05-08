const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors());
app.use(express.json());

require("dotenv").config();


// Connect MongoDB
mongoose.connect("mongodb://localhost:27017/rentcars", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// API Routes
app.use("/api/users", userRoutes);

// Boking API

app.get('/api/bookings',authenticateJWT, async (req,res)=>{
  const userId = req.user.id;
   try{
       const reservation = await Reservation.find({owner: userId});
       if(reservation){
           res.json(reservation)
       }else{
           res.json(null)
       }
   }catch(e){
       res.json(e)
   }
})



// Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
