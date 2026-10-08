import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
    BrowserRouter,
    Route,
    Routes,
} from "react-router-dom";
import Game from "./components/game";
import Home from "./components/index";
import LobbyPage from "./pages/LobbyPage";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/game" element={<Game />} />
                <Route path="/" element={<Home />} />
                <Route
                    path="/lobby"
                    element={<LobbyPage />}
                />
            </Routes>
        </BrowserRouter>
    </StrictMode>,
);
