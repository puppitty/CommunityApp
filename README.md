# CommunityConnector
A React App to keep Community Members Informed and Connected

Community Connector is a React App designed to keep Community Members involved, informed and connected.   

It includes 3 components - a Community Bulletin Board that lists all the open issues for the community and a place for each Community Member to be able to offer their feedback.  

## Contributors
* **Sumathi Ganjam** [github](https://github.com/ghSB17)
* **Efrat Rosmarin** [github](https://github.com/efratrosmarin)
* **Joyce Santos** [github](https://github.com/puppitty)

## Who this could be helpful for
This app is designed to help improve communications within communities. Possibilities include Home Owners Associations and small townships.

## Built With:

- axios,
- classnames,
- jwt-decode,
- moment,
- react, 
- react-dom, 
- react-draggable, 
- react-fa, 
- react-icons, 
- react-redux, 
- react-router-dom, 
- react-scripts, 
- redux, 
- redux-thunk, 
- bcryptjs, 
- body-parser, 
- dotenv, 
- express, 
- gravatar, 
- jsonwebtoken, 
- mongoose, 
- Mongo
- passport, 
- passport-jwt,
- New York times (API's)


### ERD
![Flowchart Image](./notes/JSJSWIM_DB.png)

### File Layout
- Client
  - public
  - src
    - App.css
    - App.js
    - index.css
    - Folders:
      - actions
      - components
        - auth
        - board
        - common
        - layout
        - news
        - posts
      - img
      - reducers
      - utils
      - validation
- config
- models
- notes
- routes
- validation
- server.js

### Community Communicator 
* Posts for Administor
![Home page](./notes/Homepage.PNG)

* Posts for User
![Home page](./notes/Homepage.PNG)

* Bulletin Board
![Login](./notes/Login_Register.PNG)

* User Sign-in 
![Sign-up Page](./notes/Signup.PNG)

* News Feed 
![Course Registration](./notes/Course_Registration.PNG)

* User Create login
![Registration Confirmation](./notes/Registered.PNG)


### Quick Start

To run a local / development copy:

1. Download the file from Github

2. CD into the directory and run npm install
  - cd CommunityApp
  - npm install
  - cd client
  - npm install
3. Create .env file with:
 
nytAPI=YOUR NYTimes API key here
MONGODB_URI=YOUR Mongo DB info goes here
secretOrKey=Your value
weatherAPI=YOUR openweatherAPI key here
