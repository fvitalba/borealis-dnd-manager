# Borealis D&D Webclient
This tool was created to run simple table top games directly in your browser. If you'd just like to host a quick game on your PC and project the monitor for your players, you only need this app.
Most of the time, however, you'll probably want to allow players to interact with you. You can access a demo here: [Borealis D&D on Heroku](https://borealis-dnd.herokuapp.com/)

You can also host the software yourself by simply running a build of "Borealis D&D Webclient" and then copying the "build" folder from "borealis-webclient" to "borealis-server".
Afterwars look to the "Borealis D&D Server" section on how to start the server.

## Available Scripts
In the project directory (borealis-webclient), you can run the following scripts:

### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`
Creates an optimized build to put in the "borealis-server" app. The "borealis-server" hosts the static files from the build folder on it's root route.

## Credits
### `dnd-map-server`
This tool is a reworked version of the following GitHub Repository:
[https://github.com/entrity/dnd-map-server](https://github.com/entrity/dnd-map-server)

The above mentioned project however is written in "old" React, using classes. This project aims to be written in "new" React using mostly arrow-functions as components.
The store and most interactions have been refactored and heavily modified. You can probably find a few similarities, but most functionality is already, or will be modified and rewritten.

### `scarlab-icons`
The icon's I'm using are from the following GitHub Repository:
[https://github.com/la-moore/scarlab-icons/tree/master/react](https://github.com/la-moore/scarlab-icons/tree/master/react)

The icons have been places within the /src/views/Icons.js file, because they could not be imported as a npm-package.
I DO NOT TAKE CREDIT FOR THESE ICONS, I HAVE TAKEN THEM FROM THE GITHUB REPOSITORY MENTIONED.

### `Tobia Vitalba`
Tobia was kind enough to create a prototype for my project and is helping me with the styling of the project overall.

## Support me
### `buy-me-a-coffee`
If you'd like to support me, feel free to [buy me a coffee](https://www.buymeacoffee.com/fabio.vitalba)! 


# Borealis D&D Server
This tool allows for hosting of a Platform to play D&D (and other Tabletop RPG) games with your friends.

## Available Scripts
In the project directory (borealis-server), you can run the following scripts:

### `npm start`
Runs the app on your server.
Open [http://localhost:8000](http://localhost:8000) to view it in the browser.

## Credits
### `dnd-map-server`
This tool is a reworked version of the following GitHub Repository:
[https://github.com/entrity/dnd-map-server](https://github.com/entrity/dnd-map-server)

The above mentioned project did not use express for hosting and was majorly rewritten. However it did help me get started with the communication between server and client.
