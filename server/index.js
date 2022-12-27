import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"
import AuthRoute from "./Routes/Auth.js"
import userRoute from "./Routes/userRoute.js"
import PostRoute from "./Routes/PostRoute.js"
import UploadRoute from "./Routes/uploadRoute.js"

//Routes
const app = express();

//middlewares
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors())

dotenv.config();

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`listening to port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });


  //usage of routes

  app.use('/auth',AuthRoute)
  app.use('/user',userRoute)
  app.use('/post',PostRoute)
  app.use("/upload",UploadRoute)