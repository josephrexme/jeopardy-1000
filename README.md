# Jeopardy Readme

This is a jeopardy web game that uses services from [jService][1].

### Running The Project

The service used is over HTTP and this might prevent requests from being fetched on a HTTPS host. It is best to download and run the project locally.

#### Running Locally

The project was built with [create-react-app][2] and uses its react-scripts. For dependency installation run:

```
npm i
```

Once all dependencies are installed, the app can be started with:

```
npm start
```

To run tests:

```
npm test --rootDir tests
```

> The extra rootDir flag is needed to workaround a react-scripts path glitch

For production deployments, the app is built into the `build` directory
with the command:

```
npm run build
```

### Game Cheat

Look in the browser console to see the double jeopardy object if you
want to be lucky!







[1]: http://jservice.io/
[2]: https://create-react-app.dev/docs/getting-started
