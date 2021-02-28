# Shopping carts and Payment request API <br />
You can easily be looking around the products in the website and add them to the cart anytime. <br />
After registering a member, you will be able to checkout your purchase and pay by credit card through NewebPay. <br />
Moreover, you can check all of your orders in a order table and track the latest status for each order. <br />

## Development mode <br />
Full back <br />

## API Reference <br />
Facebook login API <br />
NewebPay API <br />

## Features <br />
**Visiter :** <br />
Seeing all the products on the front page :<br />
 * product photo<br />
 * product name <br />
 * product description <br />
 * product price <br />
 * add to cart <br />
 * search for product name<br />

**Member :** <br />
Besides same as an visiter : <br />

*editing your profile (in the navbar > user icon > profile):<br />
  * name  <br />
  * email <br />
  * phone <br />
  * reset password <br />

*checking out products you added in the cart:<br />
  * total price  <br />
  * click + to increase quantity <br />
  * click - to decrease quantity <br />
  * click trash bin icon to delete the item <br />
  * select shipping destination <br />
  * select shipping method <br />
  * select payment method <br />

*filling in shipping information:<br /> 
  * Sender name <br />
  * Consignee name<br />
  * Consignee address<br />
  * Consignee phone<br />

After submitting the order, the order will be placed:  <br /> 
You can <br />
*pay(by credit card):<br /> 
  * input credit card information<br />
  * check out or input email address, which will receive the payment notification<br />
  * click '返回商店' to stop paying and leave <br />

*check order information and status (in the navbar > user icon > orders ):<br /> 
  * order number<br />
  * order date<br />
  * amount<br />
  * shipping status<br />
  * payment status<br />
  * button Pay-now : it will show up if the payment haven't been paid. <br />
  * button Cancel : it will show up if the shipping status  haven't been dispatched yet. <br />
  * button Details : click and then enter into order details to get all the order information<br />

## Development environment <br />
    "bcryptjs": "^2.4.3", 
    "connect-flash": "^0.1.1", 
    "cookie-parser": "~1.4.4", 
    "dotenv": "^8.2.0", 
    "express": "~4.16.1", 
    "express-handlebars": "^5.2.0", 
    "express-session": "^1.17.1", 
    "faker": "^5.1.0", 
    "method-override": "^3.0.0", 
    "moment": "^2.29.1", 
    "mysql2": "^2.2.5", 
    "nodemailer": "^6.4.17", 
    "passport": "^0.4.1", 
    "passport-facebook": "^3.0.0", 
    "passport-local": "^1.0.0", 
    "sequelize": "^6.3.5", 
    "sequelize-cli": "^6.2.0" 

## Install and implement steps <br />
Use git clone to copy this project to your localhost <br />
Input the commands below in the terminal: successful if seeing `done` <br />

```
git clone https://github.com/Sharon-Liu-go/shoppingCart.git
```

In the file path where you saved, install npm :<br />
```
npm install
```

Database : MySQL (if you don't have it, please install below) : <br />
Install  MySQL and  Workbench (macOS) <br />
MySQL : https://dev.mysql.com/downloads/mysql<br />
Workbench : https://dev.mysql.com/downloads/workbench/<br />

Install  MySQL and  Workbench (Windows) <br />
https://dev.mysql.com/downloads/windows/installer/<br />
Note: choose setup type : Full <br />


Then, set up MySQL connection in Workbench.<br />

Then ,in the file path where you saved, migrate :<br />

```
npx sequelize db:migrate
```

Seeders <br />
```
npx sequelize db:seed:all
```

Start <br />
```
npm run dev
```
Go to http://localhost:3000 

## Others <br />
the payment flow platform doesn't accept http://localhost:3000, if you can't access the payment interface of NEWEBPAY. <br />
use tool `ngrok` to get a new temporary domain and assign `NEWEBPAY_URL` in file .env as value. <br />
```
./ngrok http 3000
```

## Deployment <br />
Heroku : https://slshoppingcart.herokuapp.com
# carts-test
