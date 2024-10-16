// dotenv INIT
require("dotenv").config();

// Socket.io INIT
const { Server } = require('socket.io');

// app INIT
const cookieParser = require("cookie-parser");
const express = require('express');
const http = require('http'); // Import du module http
const registerRouter = require('./routes/register.js')
// const loginRouter = require('./routes/login.js');
const logoutRouter = require('./routes/logout.js');
const deleteRouter = require('./routes/delete.js');

// Crée une application Express
const app = express();
const port = 3000;

// Crée un serveur HTTP à partir de l'application Express
const server = http.createServer(app);

// Attache Socket.io au serveur HTTP
const io = new Server(server);

// Middleware pour traiter les JSON et les cookies
app.use(express.json());
app.use(cookieParser());

// Routes INIT
app.post('/', (req, res) => {
    return res.json({
        message: 'Bienvenue sur le serveur de messagerie socket.io !'
    })
});

app.use(registerRouter) // Route register compte
// app.use(loginRouter); // Route login compte
app.use(logoutRouter); // Route logout compte
app.use(deleteRouter); // Route delete compte


// Socket.io
io.on("connection", (socket) => {
    console.log('Un utilisateur est connecté');

    socket.on('message', (msg) => {
        console.log('Message reçu :', msg);
        // Enregistremeent du message dans la base de données
    });

    socket.on('disconnect', () => {
        console.log('Un utilisateur est déconnecté');
    });
});


// Récupérer et afficher les tables de la base de données
// const [tables] = await database.query("SHOW TABLES");
// console.log("Tables dans la base de données :");
// tables.forEach(table => {
//     console.log(Object.values(table)[0]); // Affiche le nom de chaque table
// });

// Démarrer le serveur HTTP
server.listen(port, () => {
    console.log(`API listening on http://localhost:${port}`);
});