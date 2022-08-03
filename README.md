# Build

```
docker build . -t ctf-jwt-vuln-rs256
```

# Run
Replace env var FLAG with desired flag val and run

```
docker run -p 8080:8080 -d -e FLAG='flag{MYAWESOMEFLAG}' --name ctf-jwt-vuln-rs256 --rm ctf-jwt-vuln-rs256
```

# Get container ID
```
docker ps
```

# Print app output
```
docker logs <container id>
```

# App access
Running on http://localhost:8080

# Enter the container
```
docker exec -it <container id> /bin/bash
```

# Stop container
```
docker stop ctf-jwt-vuln-rs256
```