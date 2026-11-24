
import express from "express";
import vehiculesRoutes from "./routes/vehicules.js";
import journal from "./middlewares/journal.js";

const app = express();
const PORT = 3000;

// Middleware JSON
app.use(express.json());

// Middleware Journal
app.use(journal);

// Routes véhicules
app.use("/vehicules", vehiculesRoutes);

// Gestion des routes introuvables
app.use((req, res) => {
    res.status(404).json({
        erreur: "Route introuvable"
    });
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
