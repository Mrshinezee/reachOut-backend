import express from 'express';
import winston from 'winston';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './server/routes';

const app = express();
const port = 4500;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
router(app);
app.listen(port);
winston.log('info', `App is listening on port ${port}`);
