//imports
import express from "express";
import dotenv from "dotenv";

dotenv.config();

//initialization
const app = express();
const PORT = process.env.PORT || 3000;

//functionality
app.use(express.json());

app.listen(PORT, () => {
  console.log(`server listening on PORT ${PORT}`);
});
