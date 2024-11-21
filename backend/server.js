const express = require('express');
const forge = require('node-forge');
const jose = require('node-jose');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.post('/generate-keys', async (req, res) => {
    const { kids } = req.body;

    // Generate RSA key pair
    const { publicKey, privateKey } = forge.pki.rsa.generateKeyPair(2048);

    // Convert keys to PEM format
    const publicKeyPem = forge.pki.publicKeyToPem(publicKey);
    const privateKeyPem = forge.pki.privateKeyToPem(privateKey);

    // Convert public key to JWK format
    const key = await jose.JWK.asKey(publicKeyPem, 'pem');
    const publicKeyJwk = key.toJSON();

    // Create JWKs with provided KIDs
    const jwks = kids.map((kid) => {
        return {
            ...publicKeyJwk,
            kid,
            use: 'sig',
            alg: 'RS256',
        };
    });

    // Wrap the JWKs in a 'keys' array
    const jwk = { keys: jwks };

    // Fixed payload for the JWT
    const fixedPayload = {
        sub: "api-platform.apis.cecabank.es",
        auth: "ROLE_USER,ROLE_ADMIN",
        iss: "api-platform.apis.cecabank.es",
        aud: "https://sctc-platform.cecabank.es",
        entidad: "Apigee",
        scope: "cecabank",
    };

    // Create JWTs for each KID
    const privateKeyForJwt = forge.pki.privateKeyToPem(privateKey);
    const tokens = kids.map((kid) => {
        const tokenPayload = {
            ...fixedPayload,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60), // 1 year
            jti: uuidv4(),
        };
        return jwt.sign(tokenPayload, privateKeyForJwt, { algorithm: 'RS256', header: { kid } });
    });

    // Format the keys data
    const keysData = `
Public Key (PEM Format):
${publicKeyPem}

Private Key (PEM Format):
${privateKeyPem}

JWK:
${JSON.stringify(jwk, null, 2)}

JWK (Base64):
${Buffer.from(JSON.stringify(jwk)).toString('base64')}

Private Key (Base64):
${Buffer.from(privateKeyPem).toString('base64')}

JWTs:
${tokens.join('\n')}
`;

    // Save keys to a file
    const filePath = path.join(__dirname, 'keys.txt');
    fs.writeFileSync(filePath, keysData);

    res.download(filePath, 'keys.txt', (err) => {
        if (err) {
            console.error('Error sending file:', err);
            res.status(500).send('Error generating keys');
        }
    });
});

app.post('/convert-pem-to-jwk', async (req, res) => {
    const { pemKey, kids } = req.body;

    try {
        // Convert PEM key to JWK format
        const key = await jose.JWK.asKey(pemKey, 'pem');
        const publicKeyJwk = key.toJSON();

        // Create JWKs with provided KIDs
        const jwks = kids.map((kid) => {
            return {
                ...publicKeyJwk,
                kid,
                use: 'sig',
                alg: 'RS256',
            };
        });

        // Wrap the JWKs in a 'keys' array
        const jwk = { keys: jwks };

        // Format the JWKs data
        const jwkData = `
JWK:
${JSON.stringify(jwk, null, 2)}

JWK (Base64):
${Buffer.from(JSON.stringify(jwk)).toString('base64')}
`;

        // Save JWKs to a file
        const filePath = path.join(__dirname, 'jwks.txt');
        fs.writeFileSync(filePath, jwkData);

        res.download(filePath, 'jwks.txt', (err) => {
            if (err) {
                console.error('Error sending file:', err);
                res.status(500).send('Error converting PEM to JWK');
            }
        });
    } catch (error) {
        console.error('Error converting PEM to JWK:', error);
        res.status(500).send('Error converting PEM to JWK');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});