# PogeVerse
 
Pogeverse is a trading simulatation website where the user can put in practice his investing skills in real world scenarios.

# Features

## Main Features

- All the infos and news from the crypto world
- free trading platform
- Leaderboard showing the best traders on the website
- high quality live charts and tools.

## to-do:

-  Derivatives (Futures, Options, Forwards etc..).
-  User Comments on the current market trends .
-  general UI and trading improvements.
-  general improvements on the social aspect of PogeVerse.

# How to run it

1. `git clone https://github.com/Proioxis4/crypto-trading-app/`
2. add a .env file and replace those values down below
```
DB_URI=<<your mongoDB URI>>
NS=<<your mongoDB server name>>
PORT=<<local port you want to connect to>>
NODE_ENV=<<development>>
```
3. jwt and sendgrid setup

```
JWT_SECRET=<<json webtoken key> 
JWT_EXPIRE=10min

//SendGrid infos for making the password reset feature work.

EMAIL_SERVICE=SendGrid
EMAIL_USERNAME=<<>>
EMAIL_PASSWORD=<<>>
EMAIL_FROM=<<>>
```
4. `cd client` and create another .env and replace those values
 ```
 REACT_APP_CRYPTO_API_KEY=<<rapid api key>>
REACT_APP_NEWS_API_KEY=<<rapid api key>>
 ```
5. `npm install` and `npm run start` to run the server
    `cd client` , `npm install` and `npm start` to run the frontend

# Dependencies

## Frontend and UI Design

- React
- Ant Design
- TradingView

## Backend

- express.js
- mongoose
- bcryptjs, jsonwebtoken and nodemailer


Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
