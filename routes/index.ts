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
import {Request, RequestHandler, Response} from "express-serve-static-core";
import {marked} from "marked";
import outdent from "outdent";

/**
 * Create the main router object.
 */
const router: Router = express.Router();

/**
 * This is a helper function that wraps the marked.parse() function call to parse the
 * markdown text. Note that the outdent() function is used to remove the indentation
 * from the markdown text, so that the markdown text can be indented in the view
 * template for better readability. This function is parsed to the view rendering
 * engine as a local variable called 'markdown', so that it can be used in the view template.
 */
const markdown = (text: TemplateStringsArray) => {
    return marked.parse(outdent(text));
}

/**
 * This is a helper function that wraps the res.render() function call to render the appropriate
 * view template. It is used as the RequestHandler for each route.
 *
 * @param view
 * @param option
 * @returns RequestHandler
 */
function handler(view: string, option: any = {}): RequestHandler {
    return (req: Request, res: Response) => {
        res.render(view, { markdown: markdown, path: req.path, ...option });
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
