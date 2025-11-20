import express from "express";
import fs from "fs";

const app = express();
app.use(express.json());
app.use(express.static("static")); // liefert index.html aus

const file = "owner.json";

// GET: aktuellen Besitzer holen
app.get("/owner", (req, res) => {
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  res.send(data);
});

// POST: Besitzer ändern
app.post("/owner", (req, res) => {
  const { owner } = req.body;
  if (["Semmel","Emmel","Bemmel","Jemmel"].includes(owner)) {
    fs.writeFileSync(file, JSON.stringify({ owner }));
    res.send({ status: "ok" });
  } else {
    res.status(400).send({ status: "error", msg: "Ungültiger Besitzer" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server läuft auf Port ${port}`));
