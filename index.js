var fs = require('fs')
var express = require('express')
var jwtSimple = require('jwt-simple')

var app = express()

app.get('/', function (req, res) {
    res.set('Content-Type', 'text/plain')
    res.send(`Go to "/get_token" to receive a new token.
You can send me a token as a query parameter at "/verify_token".
If it contains the magic message 'h4ck3d', you'll get the flag you are looking for.
Otherwise, you'll get nothing.`)
})

app.get('/key.pem', function (req, res) {
    res.set('Content-Type', 'text/plain')
    res.send(fs.readFileSync('key.pem', "utf8"))
})

app.get('/get_token', function (req, res) {
    res.set('Content-Type', 'text/plain')
    res.send(jwtSimple.encode({message: 'Hello world!', hint: 'check there: /key.pem'}, fs.readFileSync('key', "utf8"), 'RS256'))
})

app.get('/verify_token', function (req, res) {
    var token = req.query.token
    if (!token) {
      res.set('Content-Type', 'text/plain')
      res.send('Missing query parameter "token" !')
    }
    try {
        var decoded = jwtSimple.decode(token, fs.readFileSync('key.pem', "utf8"))
        console.log(decoded);
        if (decoded.message === 'h4ck3d') {
          res.set('Content-Type', 'text/plain')
          // res.send(decoded)
          const flag = `flag is: ${process.env.FLAG || 'flag{axalifejapan-washere-2021!}'}`
          res.send(flag)
        } else {
          res.set('Content-Type', 'text/plain')
          res.send('Error')
        }
    } catch (e) {
        console.log(e)

        res.set('Content-Type', 'text/plain')
        res.send('Error')
    }
})

app.listen(8080, function () {
    console.log('App listening on port 8080!')
})
