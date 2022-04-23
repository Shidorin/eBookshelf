## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [File structure](#file-structure)

## General info
Web application for browsing, reviewing, rating and cataloging books. 

	
## Technologies
Project is created with:
* Node.js version: 16.X
* npm version: 7.24
* React version: 17

## Setup
Using VisualCode run backend and frontend (editable file for startup is .vscode\launch.json).
Using two instaces of PowerShell start backend with "node app.js" and frontend with "npm start".

## File structure

### Backend

**src\backend\app.js** - starting file for backend, includes routings and scheduler

**src\backend\config\database.js** - defines connection with database

**src\backend\routes\?** - handling endpoint with the same name

**src\backend\models\?** - model of tables in system for Sequelize

### Frontend

**src\frontend\src\app.js** - handles routing

**src\frontend\src\components\X** - folders for every landing page with their style and modals