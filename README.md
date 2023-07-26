# link-minds

## Description

Deployed application link on GitHub
https://github.com/itcreativeusa/link-minds

Youtube video guide

This is a link-minds an API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list. App use Express.js for routing, a MongoDB database, and the Mongoose ODM.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Requirements](#requirements)
- [Credits](#credits)
- [License](#license)

## Installation

Use command-line to run the application.
Run `npm install` to install the required dependencies.
Run the database using `node utils/seed.js` to create the necessary tables.

## Requirements

Install MongoDB locally.
Use MongoDB Compass to manage created database.

## Usage

Run `npm start` to start the server.
Upon initiating the server, the Mongoose models are synced to the MongoDB database.
Open Insomnia application to test API POST, PUT, and DELETE routes.

Screenshot located in `./assets/` folder

![link-minds](Assets/screenshot.png)

## Credits

Some code for this project was taken from Mini-Project provided by Berkeley Bootcamp for studying purposes.

## License

Please refer to the LICENSE in the repo.
