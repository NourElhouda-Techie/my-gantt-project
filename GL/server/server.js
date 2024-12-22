const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

// Endpoint to save data
app.post("/save", (req, res) => {
    fs.writeFile("gantt_data.json", JSON.stringify(req.body), (err) => {
        if (err) {
            return res.status(500).send("Failed to save data");
        }
        res.send("Data saved successfully");
    });
});

// Endpoint to load data
app.get("/load", (req, res) => {
    fs.readFile("gantt_data.json", "utf8", (err, data) => {
        if (err) {
            return res.status(500).send("Failed to load data");
        }
        res.json(JSON.parse(data));
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
