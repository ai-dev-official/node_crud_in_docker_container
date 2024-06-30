# Pull the download that I need to run
FROM node:16  

# Create the working directory
WORKDIR /usr/src/app

# Copy across package.json file from local folder to the Docker Container
COPY package*.json ./

# Run npm install inside docker container 
RUN npm install

# Copy everying from current folder into working directory
COPY . .

# Expose the port we are going to access it on
EXPOSE 3000

# Execute the command to start the app inside docker container
CMD [ "npm", "run", "dev" ]