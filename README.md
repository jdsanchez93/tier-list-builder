# tier-list-builder

## Prerequisites

1. nodejs: https://nodejs.org/en/
2. npm: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
2. docker: https://docs.docker.com/desktop/install/windows-install/
3. .NET 6.0: https://dotnet.microsoft.com/en-us/download

This project has two pieces:
1. ASP.NET Core Web API (backend)
2. React App (frontend)

## ASP.NET Core Web API

Created based on this tutorial: https://dotnet.microsoft.com/en-us/learn/aspnet/microservice-tutorial/create

Located in the tier-list-api directory

This project is configured to use a mysql database.\
The connection string can be configured via the ConnectionStrings__Mysql environment variable.

For development, run `docker-compose up -d` to run a mysql db in docker.\
Launch the api in Visual Studio Code with launchSettings.json.\
Runs on port 5230.

## React app

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) TS template.

To get started, run `npm install`

Run `npm start` to run the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Deployment

Build docker image:

```
docker build -t tier-list-builder:0.0.1 .
```

Run container:
```
docker run -it --rm -p 3000:80 --name tier-list-builder --env ConnectionStrings__Mysql="Server=db;Port=3306;Database=TierList;Uid=root;Pwd=example;" --network=tier-list-builder_default tier-list-builder:0.0.1 
```