/**
 * This is the main routing controller for this node application. It is responsible for
 * handling all the routes for the application by delegating the route handling to the
 * ejs view engine and the appropriate view templates.
 *
 * @author Vincent Ngan (Student ID: 301328893)
 * @date 2023-10-01
 * @file routes/index.ts
 *
 * @module routes/index
 *
 * @requires express
 * @requires express.Router
 * @requires express-serve-static-core
 *
 * @license MIT
 */
import express, {Router} from "express";
import {NextFunction, Request, RequestHandler, Response} from "express-serve-static-core";

/**
 * Create the main router object.
 */
const router: Router = express.Router();

/**
 * This is a helper function that wraps the res.render() function call to render the appropriate
 * view template. It is used as the RequestHandler for each route.
 *
 * @param view
 * @param option
 * @returns RequestHandler
 */
function handler(view: string, option: any = {}): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
        res.render(view, { path: req.path, ...option });
    }
}

/**
 * Set up routes to delegate to the appropriate view templates.
 */
router.get("/", handler('Home'))
router.get("/projects", handler("Projects"))
router.get("/services", handler("Services"))
router.get("/about", handler("About"))
router.get("/contact", handler("Contact"))

/**
 * Module exports.
 */
export default router;
