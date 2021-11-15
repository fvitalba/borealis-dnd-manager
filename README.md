# Borealis Table Top RPG Webclient
This tool was created to run simple table top games directly in your browser. Noone has to download additional software in order to run it.

## Available Scripts
In the project directory, you can run:

### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

In order to run a specific room, simply add the parameter "room" into your URL query. For example, if you wanted to join the room DRAGONBORN (case sensitive!), then you would just have to write:
[http://localhost:3000?room=DRAGONBORN](http://localhost:3000?room=DRAGONBORN)

If you are the DM of this room, you have to add another parameter, the "host" parameter. When adding host=true, you'll be granted the editing privileges for the room. To join the room DRAGONBORN as the DM, simply type the following URL into your browser:
[http://localhost:3000?room=DRAGONBORN&host=true](http://localhost:3000?room=DRAGONBORN&host=true)


### Credits
This tool is a reworked version of the following GitHub Repository:
[https://github.com/entrity/dnd-map-server](https://github.com/entrity/dnd-map-server)

The above mentioned project however is written in "old" React, using classes. This project aims to be written in "new" React using mostly arrow-functions as components.
Also the Store was reworked and will be implemented using Redux in the future.
