import express from "express";
import fs from "fs";

const app = express();
app.use(express.json());
app.use(express.static("static")); // liefert index.html aus

// GET aktueller Besitzer
app.get("/owner", (req, res) => {
  const owner = JSON.parse(fs.readFileSync("owner.json", "utf8"));
  res.send(owner);
});

// POST neuer Besitzer
app.post("/owner", (req, res) => {
  if(req.body.owner && ["Semmel","Emmel","Bemmel","Jemmel"].includes(req.body.owner)){
    fs.writeFileSync("owner.json", JSON.stringify({owner: req.body.owner}));
    res.send({ status: "ok" });
  } else {
    res.status(400).send({ status: "error", msg: "Ungültiger Besitzer" });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server läuft auf Port", process.env.PORT || 3000);
});
