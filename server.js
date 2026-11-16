const express = require('express');
const app = express();
app.use(express.json());
// Nos données de départ (en mémoire)
let livres = [
{ id: 1, titre: "Apprendre JavaScript", auteur: "Karim Tazi", categorie: "Informatique",
disponible: true },
{ id: 2, titre: "Les bases des Réseaux", auteur: "Sanae Idrissi", categorie: "Réseaux",
disponible: true },
{ id: 3, titre: "Algorithmes simples", auteur: "Karim Tazi", categorie: "Informatique",
disponible: false },
{ id: 4, titre: "Gestion de projet", auteur: "Omar Benali", categorie: "Management",
disponible: true }
];
// Route d'accueil
app.get('/', (req, res) => {
res.send('Bienvenue sur l’API de la Bibliothèque !');
});
// 1. LIRE tous les livres (avec filtre optionnel ?categorie=...)
app.get('/livres', (req, res) => {
const categorieDemandee = req.query.categorie;
if (categorieDemandee) {
const resultat = livres.filter(l => l.categorie === categorieDemandee);
return res.json(resultat);

const categorieNomDemande = req.query.Nom;
if (categoryeNomDemande) {
    resultat = resultat.filter  (l => l.Nom === categorieNomDemande);
}
res.json(resultat);
}
res.json(livres);
});
// 2. LIRE un livre précis grâce à son id
app.get('/livres/:id', (req, res) => {
const id = Number(req.params.id);
const livre = livres.find(l => l.id === id);
if (!livre) {
return res.status(404).json({ erreur: "Livre introuvable" });
}
res.json(livre);
});
// 3. AJOUTER un nouveau livre
app.post('/livres', (req, res) => {
const titre = req.body.titre;
const auteur = req.body.auteur;
const categorie = req.body.categorie;
if (!titre || !auteur) {
return res.status(400).json({ erreur: "Le titre et l'auteur sont obligatoires" });
}
const nouveauLivre = {
id: livres.length + 1,
titre: titre,
auteur: auteur,
categorie: categorie || "Général",
disponible: true
};
livres.push(nouveauLivre);
res.status(201).json(nouveauLivre);
});
// 4. MODIFIER un livre existant
app.put('/livres/:id', (req, res) => {
const id = Number(req.params.id);
const livre = livres.find(l => l.id === id);
if (!livre) {
return res.status(404).json({ erreur: "Livre introuvable" });
}
if (req.body.titre !== undefined) livre.titre = req.body.titre;
if (req.body.auteur !== undefined) livre.auteur = req.body.auteur;
if (req.body.categorie !== undefined) livre.categorie = req.body.categorie;
if (req.body.disponible !== undefined) livre.disponible = req.body.disponible;
res.json(livre);
});
// 5. SUPPRIMER un livre
app.delete('/livres/:id', (req, res) => {
const id = Number(req.params.id);
const livre = livres.find(l => l.id === id);
if (!livre) {
return res.status(404).json({ erreur: "Livre introuvable" });
}
livres = livres.filter(l => l.id !== id);
res.status(204).send();
});
app.listen(3000, () => {
console.log('Serveur démarré sur http://localhost:3000');
});