# ZOMBIE SIGHTINGS TRACKER

## Overview
Zombie Sightings Tracker is a web application that allows users to report and track zombie sightings across Bahrain. Users can submit detailed sighting reports, view reported activity by zone, monitor threat levels, and browse information about different zombie types. The application also includes user authentication and an admin dashboard for monitoring reports and managing reported threats. 


# User Stories

### Authentication
As a visitor, I want to sign up so I can create an account.
As a user, I want to sign in and get access to protected features.
As a user, I want to be able to sign out so I can secure my account.

### Reports / Sightings
As a user, I want to submit a zombie sighting report so I can inform others about an outbreak.
As a user, I want to view all sighting reports so I can know where zombie activity has been reported.
As a user, I want to view a specific report so I can see its details.
As a user, I want to edit my own report so I can correct or update information.
As a user, I want to delete my own report so I can remove a report I no longer want displayed.

### Locations
As a user, I want to view known locations so I can see where reports are occurring.
As a user, I want to view details about a location so I can understand its current situation.

### Zombie Information
As a user, I want to browse the different zombie types so I can identify the infected I encounter.
As a user, I want to see information about each zombie type so I can understand its threat level.


### Admin
As an admin, I want to remove inappropriate or false reports so that unreliable information doesn't remain on the tracker.
As an admin, I want to access a dashboard to monitor the website easily.
As an admin, I want to download the sighting reports as a PDF so I can keep a record of reported activity.



## Technologies Used
- HTML — markup language
- CSS — stylesheet language
- JavaScript — programming language
- Node.js — runtime environment
- Express.js
- MongoDB
- Mongoose
- EJS
- Express Session — session middleware
- PDFKit
- Render — deployment/cloud hosting platform


## Screenshots

### Homepage
![Homepage](./public/images/homepage.png)

### Admin Dashboard
![Admin Dashboard](./public/images/admin-dashboard.png)

### Zones Page
![Zones Page](./public/images/zones-page.png)

### All Reports Page
![All Reports Page](./public/images/all-reports-page.png)




## Getting Started
1. Clone the repository:

    git clone https://github.com/zainabali98/zombie-sightings-tracker.git

2. Navigate into the project folder:

    cd zombie-sightings-tracker

3. Install dependencies:

    npm install

4. Start the application:

    node server.js

5. Open the application in your browser:

    http://localhost:3000



## Database Design
The application uses MongoDB with Mongoose for database management.

The database contains three main models:

User — stores user account information, occupation, contact details, admin status, and submitted reports.
Location — stores the four monitored Bahrain zones.
Sighting — stores zombie sighting reports, including zombie type, location, dangerLevel, and report owner.

## Relationships
A User can create multiple Sightings.
Each Sighting belongs to one User.
Each Sighting belongs to one Location.
A Location can have multiple Sightings.
User and Location references are handled using Mongoose ObjectIds.



## Routes

| Method | Route                 | Description                            |
| ------ | --------------------- | -------------------------------------- |
| GET    | `/`                   | Home page                              |
| GET    | `/auth/sign-up`       | Sign-up form                           |
| POST   | `/auth/sign-up`       | Create a user account                  |
| GET    | `/auth/sign-in`       | Sign-in form                           |
| POST   | `/auth/sign-in`       | Sign in                                |
| GET    | `/auth/sign-out`      | Sign out                               |
| GET    | `/reports`            | View all zombie sightings              |
| POST   | `/reports`            | Create a new sighting                  |
| GET    | `/reports/new`        | New sighting form                      |
| GET    | `/reports/my-reports` | View the signed-in user's reports      |
| GET    | `/reports/pdf`        | Download all reports as a PDF (admin)  |
| GET    | `/reports/:id`        | View a specific sighting               |
| GET    | `/reports/:id/edit`   | Edit a sighting form                   |
| PUT    | `/reports/:id`        | Update a sighting                      |
| DELETE | `/reports/:id`        | Delete a sighting                      |
| GET    | `/locations`          | View all zones                         |
| GET    | `/locations/:zone`    | View a specific zone and its sightings |
| GET    | `/zombies`            | View zombie types and information      |
| GET    | `/admin`              | Admin dashboard                        |




## Features
- download reports as a PDF using PDFKit.
- Admin Dashboard.
- Admin role and protected admin access.
- Animations.




## Future Enhancements
- Users page where admin(s) can give or revoke certain  privileges.
- Date and time for when reports were made-admin dashboard.
- Diagram that shows zones' reports percentage of all reports.
- redesign the threat level on the cards in the zones page.
- Users page:

    | GET    | `/admin/users`        | View users                |

    | PUT    | `/admin/users/:id`    | Update user/admin status  |
    
    | DELETE | `/admin/users/:id`    | Soft-delete user          |

- Profile Page: As a user, I want to manage my profile information, including my occupation and contact information.

## Credits
- All background images used in this project were sourced from: 
    (https://www.naughtydog.com).
-  All zone images sourced from google and edited by Google Gemini:
    searched for images related to the zones, such as famous landmarks and asked Gemini to make them into a certain theme. 
- 404 page generated by Google Gemini.
