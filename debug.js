- npm init -y

- create server.js file in home dir and also add node server.js to package.json

- npm install express -g

- create server.js

-npm run dev

- moving everything in current dir to dockerpostgrescrud except dockerpostgrescrud itself
-  find . -maxdepth 1 ! -name 'dockerpostgrescrud' ! -name '.' -exec mv {} dockerpostgrescrud/ \;

- docker build -t my-node-app .
- doocker images to display 

- Docker build stuck
- CTRL C
- docker builder prune

- docker-compose up
