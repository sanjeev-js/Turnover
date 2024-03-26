# Turnover

Technologies I have used for completing this project.

NodeJs, Express.js, overnight and typescript for creating apis and server.

Used knex.js for creating database table scheme and writing queries.

Used nodemailer for sending opt on mail to the users.

Used React.js and bootstrap for creating frontend ui and used react-router-dom for managing routing in the application.

#### For starting the project in local.

Note: This guide is for ubuntu operating system only. if you are using other operating system then commands might be Different

1. Clone the repo
2. do `yarn` then `cd client` and do `yarn` there as well for installing requied dependencies. 
3. come back to main direcotory.
4. run `yarn dev`

Before this you need to setup mysql in your local sysytem.

##### I have used mysql database for storing data and managing relations.

Run Following commands for the installation of mysql.
1. ```sudo apt update```
2. ```sudo apt install mysql-server```
3. ```sudo systemctl start mysql.service```
4. Now Login in mysql using ```sudo mysql``` then run the following commands for changinf password of the root user.
5. Change the password for root user by ruunning the following commands ```ALTER USER 'sammy'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';```

6. ```FLUSH PRIVILEGES;```

7. After Mysql installation and db user creation, create a database in mysql using ```create database ecommerse``` or any name you want to keep for your database.

Now setup your mail service for sending otp on mail. I have used nodemailer for sending otp email to the users.

To be able to use Gmail to send messages via your app, you should start with several account configurations.

If you use a plain password, then you should allow access to a “less secure web application”.

Go to the Less secure app access section of your Google Account.
Turn Allow less secure apps on.
Additionally, you should enable Display Unlock Captcha.
If you are using 2-Step Verification, you should sign in with App Passwords. To create your password:

Go to the Security section of your Gmail account 
Choose App Passwords in the Signing into Google block
Select the app and device from the list and press Generate.
Please note that you can use it for your personal account only. It’s not available for accounts that are a part of an organization.

8. Create a file .env in the root of the project and then all environment variable and their values in .env file, you can all variables from .env.sample file

##### Happy coding!!