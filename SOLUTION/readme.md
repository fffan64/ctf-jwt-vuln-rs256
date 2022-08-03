# Solution

1. Access to `/`, tells you to go to `/get_token`
2. Go to `/get_token`, get a token
3. Decode token at https://jwt.io to see content
4. Get public key from `/key.pem`
5. Forge a new token changing the alg to `HS256` and using the public key fetched as a secret, including as a payload `{"message": "h4ck3d"}`

Replace url if needed in `./SOLUTION/generate.js` then run
```
node ./SOLUTION/generate.js
```

6. Go to `/verify_token` and pass the forged token as a query param `token=<VALUE_GENERATED>`
```
/verify_token?token=<VALUE_GENERATED>
```
7. Flag should be displayed on page


# Explanantion
> The algorithm HS256 uses a secret key to sign and verify each message. The algorithm RS256 uses a private key to sign messages, and a public key to verify them. If we change the algorithm from RS256 to HS256, the signature is now verified using the HS256 algorithm using the public key as secret key. Since the public key is not secret at all, we can correctly sign such messages.
>
> Consider the following example code, which could be present at the server:
> ```
> jwt = JWT.decode(token, public_key)
> ```
> If the JWT uses asymmetric RS256, this correctly verifies the signature on the token. If the JWT uses symmetric HS256, however, the signature is compared to a HMAC of the token, where the public_key is used as key. We can thus exploit this vulnerability by signing our own token using HS256 with the public key of the RS256 algorithm.

https://www.sjoerdlangkemper.nl/2016/09/28/attacking-jwt-authentication/