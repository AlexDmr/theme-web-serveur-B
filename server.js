console.log(`Serveur B exécuté sur NodeJS v${process.versions.node}!`);

const https = require('https');
const fs = require("fs");
const express = require('express');
const app = express()
const { expressCspHeader, INLINE, NONE, SELF } = require('express-csp-header');

app.use(express.urlencoded({ extended: true }));
app.use( expressCspHeader({
    directives: {
        'default-src': [SELF],
        'script-src': [SELF, INLINE, 'https://localhost:8443'],
        'style-src': [SELF, 'mystyles.net', 'https://localhost:8443'],
        'img-src': ['data:', 'https://localhost:8443'],
        'worker-src': [NONE],
        'connect-src': [SELF, 'https://localhost:8443', 'http://localhost:8080']
        // 'block-all-mixed-content': true
}} ) );
app.use(express.static('client'));


app.listen(8081, () => console.log("B : Le serveur HTTP  écoute sur le port 8081") );

let priv, cert;
if (!fs.existsSync("./private.key")) {
    console.error("Pour démarrer le serveur HTTPS : Vous devriez avoir un fichier private.key contenant votre clef privé");    
} else {
    priv = fs.readFileSync("./private.key");
}

if (!fs.existsSync("./signature.cert")) {
    console.error("Pour démarrer le serveur HTTPS : Vous devriez avoir un fichier signature.cert contenant votre clef privé");    
} else {
    cert = fs.readFileSync("./signature.cert");
}

if (!!priv && !!cert) {
    https.createServer({key: priv, cert}, app).listen(8444, () => console.log("B : Le serveur HTTPS écoute sur le port 8444") )
}
