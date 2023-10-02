/**
 * The is the main application module. It is responsible for setting up the application level
 * configuration for the Express server, the ejs view engine, required middleware for parsing json
 * and urlencoded payload, and registering the main routing controller.
 *
 * @author Vincent Ngan (Student ID: 301328893)
 * @date 2023-10-01
 * @file app.ts
 *
 * @module app
 *
 * @requires express
 * @requires path
 * @requires cookie-parser
 * @requires morgan
 * @requires http-errors
 * @requires debug
 * @requires ./routes/index
 *
 * @license MIT
 */
import createError from "http-errors";
import express, {ErrorRequestHandler} from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import path from "path";
import indexRouter from "./routes/index";

const app = express();

// Set up views engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// Set up static folder
app.use("/", express.static(path.join(__dirname, 'public')));
app.use("/scripts", express.static(path.join(__dirname, 'node_modules')));

// Set up the main routing controller
app.use(indexRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// Error handler
app.use(((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
}) as ErrorRequestHandler);

/**
 * Module exports.
 */
export default app;
