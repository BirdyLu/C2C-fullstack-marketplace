import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import postRoute from "./routes/post.route.js";
import authRoute from "./routes/auth.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";

const app = express();

app.use(cors({origin: process.env.CLIENT_URL, credentials: true})); //"credentials" to send cookies to client side. 
app.use(express.json());
app.use(cookieParser());

app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/test", testRoute);

try {
    app.listen(8800, () => {
        console.log("Server is running on port 8800!");
    });
} catch (err) {
    console.log("Error starting server:", err.message);
}
