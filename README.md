# Setup

A `token.txt` file containing the SearchAPI token needs to exist in the root of the repository to allow authorization of the request. Create the `token.txt` file by running `npm run set-token` and introducing the authentication token (e.g. Bearer 123456) when asked.

Run `npm install` to install the necessary node modules to run the server.

Run `npm run start` to start the server which will be hosted in `http://localhost:4200` (the port can be changed in the environment.ts file).

The server should now be running. You can test it using:

`
curl --location --request GET 'http://localhost:4200/general-logs?limit=11&from=2022-01-10T10:54:00'
`