// Import des modules
const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000

// Couleur dans la console
const colors = require('colors')

// Connexion à MongoDB
const connectDB = require('./config/db')
connectDB()

// Initialisation d'Express
const app = express()

// Accepter les données envoyées par formulaire
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Routes
app.use('/api/', 
require('./routes/genreRoutes'))

app.use('/api/', 
require('./routes/albumRoutes'))

app.use('/api/', 
require('./routes/artisteRoutes'))

//app.use('/api/', 
//require('./routes/morceauRoutes'))

app.use('/api/', 
require('./routes/userRoutes'))

// Lancement du serveur
app.listen(port, () => {
 console.log(`Server started on ${port}`)
})