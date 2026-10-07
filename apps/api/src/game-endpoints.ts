import express, { type ErrorRequestHandler, type NextFunction, type Request, type Response } from 'express'
import passport from 'passport';

const fs = require("fs");
const levels = JSON.parse(fs.readFileSync('./levels.json', 'utf8'));
const scoreFalloff = 1.05; //adjust how quickly score decreases as you get further from the target

// this isn't part of the database because levels are associated
// with users for 30 seconds at most
var levelAssociations = new Map();

// pulled from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

exports.startNewLevel = function(req: Request, res: Response){
    if(!req.user) {
        //TODO use correct error code
        res.status(404).send('not logged in');
        return;
    }
    //get levels from levels.json
    //pick an index randomly
    //associate that level with the user
    //send back the level image
    var index: number = getRandomInt(levels.length);
    levelAssociations.set(req.user.id, {level: levels[index].name, time: Date.now()});
    exports.sendLevelImage(req, res);
}

exports.sendLevelImage = function(req: Request, res: Response){
    //send the image associated with the current level
    if(!req.user) {
        //TODO use correct error code
        res.status(404).send('not logged in');
        return;
    }

    if(!levelAssociations.has(req.user)) {
        //TODO use correct error code
        res.status(404).send('no game started');
        return;
    }

    var path: string = "../../levels/".concat(levelAssociations.get(req.user.id).name).concat(".webp");
    res.sendFile(path);
}

exports.checkGuess = function(req: Request, res: Response){
    // body should contain xPosition and yPosition
    
    //get the level currently associated with the user
    //get the guess from the request body
    //get the correct location <somehow>
    //score the guess based on its distance from the correct location
    //send back the score
    // <possibly update the user's persistant score or something ?>
    if(!req.user) {
        //TODO use correct error code
        res.status(404).send('not logged in');
        return;
    }

    if(!levelAssociations.has(req.user)) {
        //TODO use correct error code
        res.status(404).send('no game started');
        return;
    }

    const trueX = levelAssociations.get(req.user.id).mapX;
    const trueY = levelAssociations.get(req.user.id).mapY;
    const guessX = req.body.xPosition;
    const guessY = req.body.yPosition;
    
    var distance = Math.sqrt( (guessX - trueX)**2 + (guessY - trueY)**2 )
    var score = 100 - (scoreFalloff**distance - 1);

    res.send({"score" : score});
    // unassociate level from user
    levelAssociations.delete(req.user.id);
}