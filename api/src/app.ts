import cookieParser from 'cookie-parser';
import express, {Application, Request, Response, NextFunction} from 'express';
import morgan from 'morgan';
import config from '../lib/config';
import cors from 'cors';
import routes from './routes/index';

const app: Application = express();
app.use(express.urlencoded({extended: true, limit: '50mb'})); //middleware
app.use(express.json({limit: '50mb'}));
app.use(cookieParser());
app.use(morgan('dev'));

app.use(
	cors({
		origin: config.cors,
		credentials: true,
		methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
		allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Access-Control-Request-Headers', 'Access-Control-Request-Method', 'Authorization'],
	})
);

interface error {
	status: number;
	message: string;
}

app.use((err: error, req: Request, res: Response, next: NextFunction) => {
	// eslint-disable-line no-unused-vars
	const status = err.status || 500;
	const message = err.message || err;
	console.error(err);
	res.status(status).send(message);
});
// ----------------------------------------------------------------------

// Si se quiere se puede crear una ruta desde acá mismo (app.get())

// Acá estamos utilizando las rutas importadas desde /routes/index
app.use('/', routes);

export default app;
