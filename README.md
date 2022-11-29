# PatientAPP-Backend

Back end for PatientAPP
[Front end](https://github.com/ncasola/patientapp-react)

## File Structure for Build

```
├───patientapp-react
│───build-repo
```

Build path is located in the build-repo folder

## Deploy instrucions (LOCAL)

```sh
git add .
git commit -m "Message"
git push origin master
```

## Deploy instrucions (SERVER)

```sh
git pull
docker-compose up -d --build --build-arg VERSION=1
```
> Note: VERSION=1 is for recreate the database, VERSION=2 is for leave the database as it is

## References

- [Node.js](https://nodejs.org/)
- [React](https://reactjs.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Express](https://expressjs.com/)