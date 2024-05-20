import fs from 'fs';
import express, { json } from 'express';
import { nanoid } from 'nanoid';
import path from 'path';
import { fileURLToPath } from 'url';

import { log } from 'console';

// const express = require('express');

const app = express();

const __filename =  fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

app.use(express.json());

const isvalidURL = (url) => {
    
    console.log((url));
    try {
        new URL(url)
        return true;
        
    } catch (err) {

        console.log(('ERROR = ',err));
        return false;
        
    }
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})


app.post('/url-shortener', (req, res) => {

    if(!isvalidURL(req.body.url)) {
        return res.status(400).json({
            success: false,
            message: "Invalid URL! Please enter a Valid URL!"
        })
    }

    // console.log(req.body);
    // console.log(req.body.url);

    const shortURL = nanoid(11);


    // This a example showing HOW to store data in Objects and make it DYNAMIC []
    const urls = {
        [shortURL]: req.body.url,
    }
    // This a example showing HOW to store data in Objects and make it DYNAMIC []

    const urlData = fs.readFileSync('urls.json', {encoding:'utf-8'});
    const urlDataJson = JSON.parse(urlData);
    urlDataJson[shortURL] = req.body.url;

    console.log(urlDataJson[shortURL]);
    // const logginURLs = JSON.stringify(urlDataJson)
    fs.writeFileSync('urls.json', JSON.stringify(urlDataJson))

    
    res.json({
        status: true,
        // msg: 'Dummy API'
        data: `http://localhost:8008/${shortURL}`
    })
})

app.get('/:shortURL', (req, res) => {
    const fileData = fs.readFileSync('urls.json', {encoding: 'utf-8'})
    const fileDataJson = JSON.parse(fileData);
    const smallURL  = req.params.shortURL;
    const longURL = fileDataJson[smallURL];

    console.log(smallURL, ' = ', longURL);

    const data = smallURL + ' = ' + longURL;

    fs.appendFileSync('data.log', "\n" + data)

    if(!longURL) {
        return res.status(404).json({
            success: 'false',
            message: 'No PAGE FOUND'
        })
    }

    res.redirect(longURL)
})

const errorHandlingMiddleware = (err, req, res, next) => {
    fs.appendFileSync('Errors.log', '\n' + err)
    console.log('ErrorHandlingMiddleware Error = ', err);

    res.status(404).json({
        status: false,
        message: 'Middleware Error'
    })
}

app.use(errorHandlingMiddleware);

app.listen(8008, () => {
    console.log('Server is running at PORT 8008');
})