import dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || 'IvGroC';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'Sc.110011.cS';
const MONGO_HOST = process.env.MONGO_HOST || 'cluster0.7j9gb.mongodb.net/books_nodeHW';

const MONGO = {
    host: MONGO_HOST,
    password: MONGO_PASSWORD,
    userName: MONGO_USERNAME,
    url:`mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`
}

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 3300;

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
}

const SECRET_TOKEN = process.env.SECRET_TOKEN || 'superpasswordkey';
const SECRETS={
    token: SECRET_TOKEN
}

const config = {
    server: SERVER,
    secrets: SECRETS,    
    mongo: MONGO
}

export default config;
