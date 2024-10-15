# UI for the App

The UI app is hosted under

```
- digital-broker-app/packages/ui
```

```
- Open the project in the terminal
- Run -> cd packages/ui (make sure you are in the ui folder on the terminal after running the command)
```

### Install

```
npm install
```

### Build

```
npm run build
```

### Start

```
npm start
```

### Run end-to-end test

```
npm run cy:open
```

######

Pre-requisite: UI App should be up and running to run the end-to-end Cypress test.

```
- Please check after running the above run command, it has opened Cypress locally.
- Click on E2E Testing
- Select a browser & click Start E2E Testing in .... (which should open up a browser)
- Click spec.cy.ts (which will run the interaction end to end for the happy and negative path)
```
