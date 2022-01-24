import http from 'http';
import express, { Express } from 'express';
import routes from './routes/logs';
import { environment } from './environment';

const router: Express = express();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.use('/', routes);

const httpServer = http.createServer(router)
const port = environment.PORT;
httpServer.listen(port, () => console.log(`The server is running on port ${port}`))