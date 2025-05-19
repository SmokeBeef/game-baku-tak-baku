import { createBrowserRouter } from "react-router";
import Game from "./modules/Game";
import './index.css'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Game />
    },
    {

    }
])