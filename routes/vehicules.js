
import express from "express";

const router = express.Router();

let vehicules = [
    {
        id: 1,
        marque: "Dacia",
        modele: "Logan",
        immatriculation: "12345-A-6",
        disponible: true
    },
    {
        id: 2,
        marque: "Renault",
        modele: "Clio",
        immatriculation: "67890-B-6",
        disponible: false
    },
    {
        id: 3,
        marque: "Peugeot",
        modele: "208",
        immatriculation: "24680-D-1",
        disponible: true
    }
];

// GET : Liste des véhicules disponibles
router.get("/", (req, res) => {
    const disponibles = vehicules.filter(v => v.disponible === true);
    res.status(200).json(disponibles);
});

// GET : Véhicule par ID
router.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    const vehicule = vehicules.find(v => v.id === id);

    if (!vehicule) {
        return res.status(404).json({
            erreur: "Véhicule introuvable"
        });
    }

    res.status(200).json(vehicule);
});

// POST : Ajouter un véhicule
router.post("/", (req, res) => {
    const { marque, modele, immatriculation } = req.body;

    if (!marque || !modele || !immatriculation) {
        return res.status(400).json({
            erreur: "Champs obligatoires manquants"
        });
    }

    const nouveauVehicule = {
        id: vehicules.length
            ? Math.max(...vehicules.map(v => v.id)) + 1
            : 1,
        marque,
        modele,
        immatriculation,
        disponible: true
    };

    vehicules.push(nouveauVehicule);

    res.status(201).json(nouveauVehicule);
});

// PATCH : Modifier un véhicule
router.patch("/:id", (req, res) => {
    const id = Number(req.params.id);
    const vehicule = vehicules.find(v => v.id === id);

    if (!vehicule) {
        return res.status(404).json({
            erreur: "Véhicule introuvable"
        });
    }

    Object.assign(vehicule, req.body);

    res.status(200).json(vehicule);
});

// DELETE : Supprimer un véhicule
router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = vehicules.findIndex(v => v.id === id);

    if (index === -1) {
        return res.status(404).json({
            erreur: "Véhicule introuvable"
        });
    }

    vehicules.splice(index, 1);

    res.status(204).send();
});

export default router;
