const mongoose = require('mongoose');
const dotenv = require('dotenv').config()

//const { Genre, Artiste, Utilisateur, Album, Morceau, Appartient } = require('../models'); // Assurez-vous d'importer correctement vos modèles
const Genre = require('../models/genreModel.js')
const Artiste = require('../models/artisteModel.js')
const Utilisateur = require('../models/utilisateurModel.js')
const Album = require('../models/albumModel.js')
const Morceau = require('../models/morceauModel.js')
const Appartient = require('../models/appartientModel.js')


// Connexion à la base de données
//mongoose.connect('mongodb://localhost:27017/maBaseDeDonnees', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Fonction pour créer les données de la base de données
async function seedDatabase() {
  try {
    // Création de genres
    const validObjectId = "5e7d5f3a724bd9f48c9c7a8f";
    const validObjectId2 = "5e7d5f3a624bd9f48c9c7a8f";
    const validObjectId3 = "5e7d6f3a624bd9f48c9c7a8f";
    const rockGenre = await Genre.create({ _id: validObjectId, titre: 'Rock', description: 'Musique rock qui décoiffe' });
    const popGenre = await Genre.create({ _id: validObjectId2, titre: 'Pop', description: 'Musique pop qui bouge' });

    // Création de deux artistes
    const jjgoldman = await Artiste.create({ _id: validObjectId, nom: 'Jean-Jacques Goldman', biographie: 'Artiste populaire' });
    const michelSardou = await Artiste.create({ _id: validObjectId2, nom: 'Michel Sardou', biographie: 'Artiste francais' });

    // Création de deux utilisateurs
    const user1 = await Utilisateur.create({ _id: validObjectId, mdp: 'motdepasse', email: 'utilisateur@example.com' });
    const user2 = await Utilisateur.create({ _id: validObjectId2, mdp: 'motdepasse2', email: 'utilisateur2@example.com' });

    // Création d'un album lié à un artiste
    const album1 = await Album.create({
      _id: validObjectId,
      image_pochette: 'album1.jpg',
      date_sortie: new Date('2022-01-01'),
      id_artiste: jjgoldman._id,
    });

    const album2 = await Album.create({
        _id: validObjectId2,
        image_pochette: 'album2.jpg',
        date_sortie: new Date('1990-01-01'),
        id_artiste: michelSardou._id,
      });

    // Création d'un morceau lié à un artiste et un album
    const morceau1 = await Morceau.create({
      _id: validObjectId,
      titre: "Quand la musique est bonne",
      duree: 4.5,
      id_artiste: jjgoldman._id,
      id_album: album1._id, // Utilisation de l'ID de l'album créé précédemment
    });

    const morceau2 = await Morceau.create({
        _id: validObjectId2,
        titre: "Les lacs du Connemara",
        duree: 4.5,
        id_artiste: michelSardou._id,
        id_album: album2._id, // Utilisation de l'ID de l'album créé précédemment
    });

    const morceau3 = await Morceau.create({
        _id: validObjectId3,
        titre: "Je marche seul",
        duree: 3.5,
        id_artiste: jjgoldman._id,
        id_album: album1._id, // Utilisation de l'ID de l'album créé précédemment
    });

    // Liaison des morceaux avec les genres
    await Appartient.create({
      _id: {
        id_morceau: morceau1._id,
        id_genre: rockGenre._id
      }
    });

    await Appartient.create({
      _id: {
        id_morceau: morceau1._id,
        id_genre: popGenre._id
      }
    });

    await Appartient.create({
      _id: {
        id_morceau: morceau2._id,
        id_genre: popGenre._id
      }
      });

    await Appartient.create({
      _id: {
        id_morceau: morceau3._id,
        id_genre: popGenre._id
      }  
    });

    console.log('Données insérées avec succès.');
  } catch (error) {
    console.error('Erreur lors de l\'insertion des données :', error);
  } finally {
    // Déconnexion de la base de données
    mongoose.disconnect();
  }
}

// Appel de la fonction pour créer les données
seedDatabase();
