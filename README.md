## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [File structure](#file-structure)

## General info
This project is simple Lorem ipsum dolor generator.
	
## Technologies
Project is created with:
* Lorem version: 12.3
* Ipsum version: 2.33
* Ament library version: 999


## File structure

### Backend

**src\backend\app.js** - starting file for backend, includes routings and scheduler

**src\backend\config\database.js** - defines connection with database

**src\backend\routes\?** - handling endpoint with the same name

**src\backend\models\?** - model of tables in system for Sequelize

### Frontend

**src\frontend\src\app.js** - handles routing

**src\frontend\src\components\X** - folders for every landing page with their style and modals