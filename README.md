# Mr. Dean's AttendEaze
A company events application to create, join, and organize internal events for employees.

[Screenshot that links to YouTube Video]
https://www.youtube.com/watch?v=Lj3gdQqhfJI

## Table of Contents
* [Getting Started](#getting-started)
* [Features](#features)
* [Tech/Framework Used](#tech-stack)
* [Contributors](#contributors)

## <a name="getting-started"></a>Getting Started
Fork and clone this repo and install to a local directory. You will need to [install and run PostgreSQL](https://www.postgresql.org/download/) on your local machine before running this application.

**Run the Postgres schema to install database and tables (WARNING running this again after you start using the app will drop the database and erase all existing data):**
```
psql -u [username] < prisma/schema.sql
```

**From your local directory, install dependencies:**
```
npm run install
```

**Run a development Next/React build + client server:**
```
npm run dev
```

**Run the Express server:**
```
npm run server
```

**Run a production build + client server:**
```
npm run build
npm start
```

## <a name="features"></a>Features

### Login
Login and security uses Google and Next/Auth for secure sign-in.

![](/screenshots/login.gif)

### Search Events
Dynamic search renders events by name and city.

![](/screenshots/search.gif)

### Create Event
Users with admin privileges can create event that posts to the database and is rendered for all users.

![](/screenshots/create.gif)

## <a name="tech-stack"></a>Tech/Frameworks Used
**Built with:**
* Next.js
* Next/auth
* React
* Express
* PostgreSQL
* Cloudinary
* React-Boostrap
* Material UI

## <a name="contributors"></a>Contributors
* [Dennis Arnold](https://github.com/DennisJArnold)
* [Joseph Monreal](https://github.com/josephmonreal00 )
* [Hayden West](https://github.com/htwest)
* [Johnny Frame](https://github.com/jbframe)
* [Glenmore Vinoya](https://github.com/kuyavinny)
* [Graham Kirsh](https://github.com/21grahams)
* [David Goelitz](https://github.com/dgoelitz)
* [Jim Burch](https://github.com/JimBurch)