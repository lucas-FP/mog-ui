# mog-ui

mog-ui is the user interface for mog server. mog is a Minimalistic Online Game server.
The user interface is built with React, and uses [socket.io](https://socket.io/) to provide live game experience to users.

As of this moment, there is only one game implemented: _Connect_.

## Contributing

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

If you wish to contribute to the project, a good start would be to look into the todo list below. Notice that some of these items will require changes to [mog server](https://github.com/lucas-FP/mog).

### Todo List

- Add styling to the components
- Translate to Brazilian Portuguese
- Turn timer
- Add sounds
- "Blink" effect when player clicks on grid cell
- Add a new game

### Available Scripts

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
