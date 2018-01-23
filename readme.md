# GoRetro #

#### This app is straight :fire: ####
Lego Trader lets you trade your lego sets with other Lego enthusiasts!

## Greenfield Team 
* [Luna Kim - Software Engineer](https://github.com/lunakim96) :star2: 
* [Grant Spilsbury - Software Engineer](https://github.com/grantspilsbury) :star2: 
* [Patty Kovash - Scrum Master](https://github.com/PattyKovash) :star2: 
* [Ralph Plumley - Product Owner](https://github.com/ralphplumley) :star2: 

## Dependencies
    "aws-sdk": "^2.181.0",
    "body-parser": "^1.18.2",
    "cookie-parser": "^1.4.3",
    "express": "^4.16.2",
    "express-session": "^1.15.6",
    "jquery": "^3.2.1",
    "mongoose": "^4.13.9",
    "nodemailer": "^4.4.1",
    "passport": "^0.4.0",
    "passport-facebook": "^2.1.1",
    "react": "^16.2.0",
    "react-dom": "^16.2.0",
    "react-form-validator-core": "^0.3.0",
    "react-route-props": "^1.0.4",
    "react-router-dom": "^4.2.2",
    "request": "^2.83.0"

## To run the app locally
1. In the root directory of your app run ```npm install```
2. Sign up for a SendGrid account and take note of the username and password that you used to login to the site.
3. Sign in to Amazon Web Services. Locate and take note of your (IAM) credentials (API key and secret).
4. Create a bucket on AWS S3 with public read access. Keep track of the bucket name. [Make sure you set up CORS permissions](https://devcenter.heroku.com/articles/s3-upload-node).
5. In the root of your app change the name of config.example.js to config.js. You can update your local variables here.
6. Start the React server by running ```npm run react-server```
7. Start the node server by running ```npm run server-dev```

## To Deploy the app
1. In the root directory of your app run ```npm install```
2. Sign up for a SendGrid account and take note of the username and password that you used to login to the site.
3. Sign in to Amazon Web Services. Locate and take note of your (IAM) credentials (API key and secret).
4. Create a bucket on AWS S3 with public read access. Keep track of the bucket name. [Make sure you set up CORS permissions](https://devcenter.heroku.com/articles/s3-upload-node).
5. Sign up for a free Heroku account.
6. [Create an empty app on Heroku](https://devcenter.heroku.com/articles/deploying-nodejs).
7. [Add the mLab MongoDB add-on to Heroku](https://elements.heroku.com/addons/mongolab).
8. In the root of your app change the name of config.example.js to config.js. You can update your local variables here.
9. Set Heroku environment variables (from the Heoku CLI) for the following variables:
- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
- S3_BUCKET
- SENDGRID_PASSWORD
- SENDGRID_USER
- MONGODB_URI (this should've already been added by the mLab add-on).
10. (This is a hack) Run ```npm run react-server```. Stop the server by pressing Ctrl + C. This will create a bundle.js file.
11. [Commit and push your app code to Heroku](https://devcenter.heroku.com/articles/deploying-nodejs)

## Future considerations
* User Login
* User Account management
* OAuth via Passport
* Allow users to create, read, update, delete listings
* Dynamic searching
* Page refresh capability
* Allow multiple categories for a listing
* Use mapping API to utilize location information
* Chat
* “Build” meetups
* Enhanced UI
* More robust form validation

##  Acknowledgments
:clap: The HiRs that helped with our issues! :clap:
