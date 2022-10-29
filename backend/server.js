const app = require('./app');

app.get('/*', (req, res) => res.send("hello world !"));


let port = process.env.PORT || 3000;

//express nous permet de créer un serveur http qui recoit les requêtes envoyées par la partie frontend et qui va envoyer les pages à afficher au navigateur
app.listen(port, () => {
    console.log(`Server listening on PORT : ${port}`);
});



/*********  ou on peut faire comme ça ***********/
// const http = require('http');
// const app = require('./app');
// const server = http.createServer(app);
// server.listen(port, () => {
//     console.log(`Server listening on PORT : ${port}`);
// });