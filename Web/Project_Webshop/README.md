# Project Webshop - Creating a simple webshop with MERN-stack

- Express backend running on port 3000
- React frontend running on port 4000
- Run backend server only: in /backend directory: $ npm run dev
- Run back- and frontend concurrently: in /backend directory: $ npm run servers

# REST API Routes
## GET
- '/products': Returns an array of Product objects in JSON format
- '/order/(id)': Returns Order object for specified order id in JSON format
- '/order/(id)/products': Returns an array of Product objects for specified order id in JSON format
- '/user/(id)': Returns a User object for specified user id in JSON format

## POST
- '/order': Creates a new Order in database + appropriate Order Lines and returns the new order_id in JSON format (eg. {"order_id": 5})
- '/user/new': Creates a new User/Customer in database new customer_id in JSON format (eg. {"customer_id": 5})