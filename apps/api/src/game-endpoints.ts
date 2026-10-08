import express, {
    type ErrorRequestHandler,
    type NextFunction,
    type Request,
    type Response,
} from "express";
import passport from "passport";
import fs from "fs";
import path from "path";

const levels = JSON.parse(
    fs.readFileSync(
        new URL(
            "../../../levels/levels.json",
            import.meta.url,
        ),
        "utf8",
    ),
);
const scoreFalloff = 1.05; //adjust how quickly score decreases as you get further from the target

// this isn't part of the database because levels are associated
// with users for 30 seconds at most
var levelAssociations = new Map();

// pulled from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

export function startNewLevel(req: Request, res: Response) {
    if (!req.user) {
        //TODO use correct error code
        res.status(404).send("not logged in");
        return;
    }
    //get levels from levels.json
    //pick an index randomly
    //associate that level with the user
    //send back the level image
    var index: number = getRandomInt(levels.length);
    levelAssociations.set(req.user.id, {
        level: levels[index].name,
        index: index,
        time: Date.now(),
    });
    sendLevelImage(req, res);
}

export function sendLevelImage(
    req: Request,
    res: Response,
) {
    //send the image associated with the current level
    if (!req.user) {
        //TODO use correct error code
        res.status(404).send("not logged in");
        return;
    }

    if (!levelAssociations.has(req.user.id)) {
        //TODO use correct error code
        res.status(404).send("no game started");
        return;
    }

    var path: string = levelAssociations
        .get(req.user.id)
        .level.concat(".webp");
    res.sendFile(path, { root: "../../levels" });
}

export function checkGuess(req: Request, res: Response) {
    // body should contain xPosition and yPosition

    //get the level currently associated with the user
    //get the guess from the request body
    //get the correct location <somehow>
    //score the guess based on its distance from the correct location
    //send back the score
    // <possibly update the user's persistant score or something ?>
    if (!req.user) {
        res.status(401).send("not logged in");
        return;
    }

    if (!levelAssociations.has(req.user.id)) {
        res.status(404).send("no game started");
        return;
    }

    const levelIndex = levelAssociations.get(
        req.user.id,
    ).index;
    const trueX = levels[levelIndex].mapX;
    const trueY = levels[levelIndex].mapY;
    const guessX = req.body.xPosition;
    const guessY = req.body.yPosition;

    const distance = Math.sqrt(
        (guessX - trueX) ** 2 + (guessY - trueY) ** 2,
    );

    // Calculate the raw penalty to see exactly how massive it gets
    const penalty = scoreFalloff ** distance - 1;
    const maxScore = 5000;
    const perfectRadius = 25;
    const falloffScale = 300;
    let score = 0;

    if (distance <= perfectRadius) {
        score = maxScore;
    } else {
        const penaltyDistance = distance - perfectRadius;
        score =
            maxScore *
            Math.exp(-penaltyDistance / falloffScale);
    }

    // Clamp the score so it never drops below 0
    const finalScore = Math.max(0, score);

    res.send({ score: finalScore });

    levelAssociations.delete(req.user.id);
}
