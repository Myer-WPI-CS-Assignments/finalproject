import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import GuessMap from "./guessMap";
import { useNavigate } from "react-router-dom";

export default function Game() {
    const navigate = useNavigate();

    const [imageSrc, setImageSrc] = useState<string>("");
    const [level, setLevel] = useState<number>(1);
    const [isAuthenticated, setIsAuthenticated] = useState<
        boolean | null
    >(null);
    const [score, setScore] = useState<number | null>(null);
    const [totalScore, setTotalScore] = useState<number>(0);
    const [hasGuessed, setHasGuessed] =
        useState<boolean>(false);

    useEffect(() => {
        fetch("/api/me").then((res) => {
            if (!res.ok) {
                navigate("/");
            } else {
                setIsAuthenticated(true);
                startNewLevel();
            }
        });
    }, [navigate]);

    const startNewLevel = () => {
        fetch("/api/level/new", { method: "POST" })
            .then((res) => {
                if (!res.ok)
                    throw new Error(
                        "Failed to load level image",
                    );
                return res.blob();
            })
            .then((blob) => {
                setImageSrc(URL.createObjectURL(blob));
            })
            .catch(console.error);
    };

    const handleGuess = (pos: [number, number]) => {
        fetch("/api/level/guess", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                xPosition: pos[1],
                yPosition: pos[0],
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setScore(data.score);
                setTotalScore((prev) => prev + data.score);
                setHasGuessed(true);
            })
            .catch(console.error);
    };

    const handleNextLevel = () => {
        if (level >= 5) {
            navigate("/lobby"); 
        } else {
            setLevel((prev) => prev + 1);
            setScore(null);
            setHasGuessed(false);
            setImageSrc("");
            startNewLevel();
        }
    };

    if (isAuthenticated === null) return null;
    if (isAuthenticated === false)
        return <div>Please log in to play.</div>;

    return (
        <div
            style={{
                position: "relative",
                width: "100vw",
                height: "100vh",
                backgroundColor: "#000",
            }}
        >
            <div style={{ position: "fixed" }}>
                {imageSrc && (
                    <img
                        src={imageSrc}
                        style={{
                            width: "100vw",
                            height: "100vh",
                            objectFit: "cover",
                        }}
                    />
                )}
            </div>

            <Box
                component="section"
                sx={{
                    p: 2,
                    borderRadius: "15px",
                    position: "absolute",
                    zIndex: 1,
                    bgcolor: "rgba(0,0,0,0.8)",
                    color: "white",
                    top: "20px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1,
                }}
            >
                <div
                    style={{
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                    }}
                >
                    Level {level} / 5
                </div>
                <div>
                    Total Score: {Math.round(totalScore)}
                </div>

                {hasGuessed && (
                    <>
                        <div style={{ color: "#FF4D4D" }}>
                            Round Score:{" "}
                            {Math.round(score!)}
                        </div>
                        <Button
                            variant="contained"
                            onClick={handleNextLevel}
                            sx={{
                                mt: 1,
                                backgroundColor: "#FF4D4D",
                            }}
                        >
                            {level === 5
                                ? "Finish Game"
                                : "Next Level"}
                        </Button>
                    </>
                )}
            </Box>

            {/* Hide the map so they can't double-guess once submitted */}
            {!hasGuessed && (
                <div
                    style={{
                        position: "absolute",
                        bottom: "20px",
                        right: "20px",
                        zIndex: 10,
                    }}
                >
                    <GuessMap onSubmit={handleGuess} />
                </div>
            )}
        </div>
    );
}
