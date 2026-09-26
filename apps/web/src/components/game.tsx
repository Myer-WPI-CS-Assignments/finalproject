import { colors } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import GuessMap from "./guessMap";

// In the future this will have to be provided by the server.
const testImage: string = "/image.webp";
const level: number = 1;

export default function Game() {
    return (
        <div
            style={{
                position: "relative",
                width: "100vw",
                height: "100vh",
            }}
        >
            <div style={{ position: "fixed" }}>
                <img
                    src={testImage}
                    style={{
                        width: "100vw",
                        height: "100vh",
                        objectFit: "cover",
                    }}
                />
            </div>

            <Box
                component="section"
                sx={{
                    p: 1,
                    borderRadius: "15px",
                    position: "absolute",
                    zIndex: 1,
                    bgcolor: "primary.main",
                    color: "white",
                    bottom: "20px",
                    left: "50%",
                    transform: "translateX(-50%)",
                }}
            >
                Level {level}
            </Box>
            <div
                style={{
                    position: "absolute",
                    bottom: "20px",
                    right: "20px",
                    zIndex: 10,
                }}
            >
                <GuessMap />
            </div>
        </div>
    );
}
