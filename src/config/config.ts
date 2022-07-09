import 'dotenv/config'

const config = {
    db: {
        name: process.env.DB_NAME,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT || 3306
    },
    mongoConnectStr: process.env.MONGO_CONNECT_STRING || "",
    messageEndpoint: process.env.MESSAGE_ENDPOINT || "",
    apiPort: process.env.API_PORT || 8080,
    checkInterval: process.env.CHECK_INTERVAL || 5
}

export default config