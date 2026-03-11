import express from "express";
import cors from "cors";
import matchRoutes from "./routes/matchRoutes.js";
import sampleRoutes from "./routes/sampleRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", matchRoutes);
app.use("/api", sampleRoutes);
const PORT = 5000;

app.get("/", (req, res) => {
    res.send("Resume Matching API running");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});