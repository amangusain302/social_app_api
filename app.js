const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("morgan");
const helmet = require("helmet");
const morgan = require("morgan");
const errorMiddleware = require("./src/middlewares/Error");
const rootRouter = require("./rootRouter");
const { config } = require('dotenv');
const cloudinary = require('cloudinary');
const dbConnection = require("./src/config/db");
config({
    path: "./.env"
});
dbConnection();


cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
    api_key: process.env.CLOUDINARY_CLIENT_API,
    api_secret: process.env.CLOUDINARY_CLIENT_SECRET
});

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('common'));
app.use(helmet());



app.use('/api/v1', rootRouter);

app.get('/', (req, res) => {
    res.send("<h1>welcome to New Gen Social App</h1>");
})


app.use(errorMiddleware);

const port = process.env.PORT || 8082;

app.listen(port, (err, data) => {
    console.log(`Server is running on ${port} port`);
})