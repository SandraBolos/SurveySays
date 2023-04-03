import { UserDisplayName } from "../utilities/index.js";

export function DisplayHomePage(req, res, next) {
    res.render('index', { title: 'Home', page: 'home', username: UserDisplayName(req) });
}