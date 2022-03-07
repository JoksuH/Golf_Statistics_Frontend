Golf Statistics Tracker
============

This golf statistics tracker was created by me to allow me to track golf stats that could not be tracked either at all or for free in other apps.

This frontend is running React.js with Typescript, using Apollo and GraphQL for data fetching and saving

The backend can be found at https://github.com/JoksuH/Golf_Statistics_Backend_Node_GraphQL

## Goals and Learnings

- Learn Typescript
- Try out Apollo and GraphQL
- Try out more React hooks such as useRef


## Features
- Ability to add courses and their scorecards into db.
- The user can enter scores and measurements easily using the numpad layout.
- The difference caused by playing different tee boxes can be monitored and seen easily through a tab selection.
- Statistics are in most cases calculated as a 7 -round moving average and shown in their own pages.
- Makes it easier to spot trends in skills using the graphs and their slopes.


## To-do
- Mobile interface could be improved for smaller screens
- More statistics could be added using the already received data
- Bug fixes

Golf statistics page
![Golf statistics page](https://i.imgur.com/FezjKQe.jpg)

Entering a round score
![Entering a round score](https://i.imgur.com/vs9KRTp.jpg)


Live demo available at https://golf-statistics-2021.herokuapp.com/ using example data fetched from Mongo's cloud database. 

## Setup
Clone this repo to your desktop and run `npm install` to install all the dependencies.

---

## Usage
After you clone this repo to your desktop, go to its root directory and run `npm install` to install its dependencies.

Once the dependencies are installed, you can run  `npm start` to start the application. You will then be able to access it at localhost:3000

If you want to run the project from your computer, you need to run the backend at the same time as the front end using a port of your choice. The default port address is localhost:4000

---
