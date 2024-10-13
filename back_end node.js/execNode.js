const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "alarmsystem",
});

connection.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données:", err);
    return;
  }
  console.log("Connecté à la base de données.");
});

app.get("/api/select", (req, res) => {
  connection.query("SELECT * FROM alarmstatus", (err, results) => {
    if (err) {
      console.error("Erreur de sélection des données:", err);
      res.status(500).send("Erreur de sélection des données");
      return;
    }
    res.json(results);
  });
});

app.post("/api/updatedb", (req, res) => {
  const { id, statut, z1, z2, z3, z4 } = req.body;

  if (
    id === undefined ||
    statut === undefined ||
    z1 === undefined ||
    z2 === undefined ||
    z3 === undefined ||
    z4 === undefined
  ) {
    res.status(400).send("Paramètres manquants");
    return;
  }

  connection.query(
    "UPDATE alarmstatus SET statut = ?, z1 = ?, z2 = ?, z3 = ?, z4 = ? WHERE id = ?",
    [statut, z1, z2, z3, z4, id],
    (err) => {
      if (err) {
        console.error("Erreur de mise à jour des données:", err);
        res.status(500).send("Erreur de mise à jour des données");
        return;
      }
      res.send("Statut mis à jour avec succès");
    }
  );
});

app.post("/api/updatezone", (req, res) => {
  const { zone, status } = req.body;
  
  if (!zone || !status) {
    res.status(400).send("Paramètres manquants");
    return;
  }

  let updateQuery = `UPDATE alarmstatus SET ${zone} = ? WHERE id = 1`; // Assuming there's only one row with id = 1

  connection.query(updateQuery, [status === 'on' ? 1 : 0], (err) => {
    if (err) {
      console.error("Erreur de mise à jour de la zone:", err);
      res.status(500).send("Erreur de mise à jour de la zone");
      return;
    }
    res.send("Zone mise à jour avec succès");
  });
});

app.post("/api/reset", (req, res) => {
  connection.query("UPDATE alarmstatus SET z1 = 0, z2 = 0, z3 = 0, z4 = 0", (err) => {
    if (err) {
      console.error("Erreur de réinitialisation des zones:", err);
      res.status(500).send("Erreur de réinitialisation des zones");
      return;
    }
    res.send("Zones réinitialisées avec succès");
  });
});

app.post("/api/activate", (req, res) => {
  connection.query("UPDATE alarmstatus SET statut = 1 WHERE id = 1", (err) => {
    if (err) {
      console.error("Erreur d'activation de l'alarme:", err);
      res.status(500).send("Erreur d'activation de l'alarme");

      return;
    }
    res.send("Alarme activée avec succès");
  });
});

app.post("/api/desactivate", (req, res) => {
  connection.query("UPDATE alarmstatus SET statut = 0 WHERE id = 1", (err) => {
    if (err) {
      console.error("Erreur de désactivation de l'alarme:", err);
      res.status(500).send("Erreur de désactivation de l'alarme");
      return;
    }
    res.send("Alarme désactivée avec succès");
  });
});

app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});
