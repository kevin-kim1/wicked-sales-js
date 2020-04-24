# User add an item to their cart - Back End.

## Implementation

For this feature you will be creating endpoints to retrieve or add to shopping cart data in the database. This will require two new tables in the `wickedSales` PostgreSQL database.

Clients will be `POST`ing a `productId` in the request body and there will be an endpoint dedicated to creating a cart if it doesn't yet exist, and then adding the matching product to that cart.

You will be incorporating session cookies to track the shopping cart of individual clients (e.g. different users.).

## Tips

Pay close attention to the `server/sessions/` directory of your project. This is where your Express.js server will store data related to session cookies. If you assign any values to `req.session`, they will be stored in a JSON file here.

Test your endpoints with HTTPie.

After modifying your database schema, be sure to export it with `npm run db:export`.

### 💰 Motivation

Different users will be shopping at the store so the back end needs to remember who they are and what they are trying to buy, without mixing up their carts. Prices will also need to be saved at the time the user added the product to their cart.

### ✅ Task List

- Update the database schema.
  - Launch `pgweb` with the following command and visit http://localhost:8081 in your web browser.
      ```bash
      pgweb --db=wickedSales
      ```
  - Open the Query tab of `pgweb` in your browser and create a new `"carts"` table with the following SQL statement. Click **Run Query** once you've entered it. Both `"cartId"` and `"createdAt"` will be auto-generated values.
      ```sql
      create table "carts" (
        "cartId"    serial         primary key,
        "createdAt" timestamptz(6) not null default now()
      );
      ```
  - Export your database schema again using `npm run db:export` and make a commit.
  - Back in `pgweb`, clear the Query tab and create a new `"cartItems"` table with the following SQL statement. Click **Run Query** once you've entered it.
      ```sql
      create table "cartItems" (
        "cartItemId" serial  primary key,
        "cartId"     integer not null,
        "productId"  integer not null,
        "price"      integer not null
      );
      ```
  - Export your database schema again using `npm run db:export` and make a commit.
- Add an initial `GET` endpoint for `/api/cart`.
  - In `server/index.js`, add a new endpoint to your Express.js server that handles `GET` requests to `/api/cart`. The endpoint should simply respond with an empty JSON array for now.
- Add a `POST` endpoint for `/api/cart`.

    - Buckle your safety belt. Here is high-level pseudo code for what you're about to implement. The detailed instructions come after this list:

      1. Validate that the request body contains a valid `productId` (a positive integer).
      1. Attempt to query the database for a `price` that matches the `productId`. If there is none, respond with a `400` error and helpful message.
      1. Create a new entry in the `carts` table if one doesn't exist.
      1. Assign the created cart's `cartId` to the `req.session`.
      1. Create a new entry in the `cartItems` table containing the client's `cartId`, the target `productId`, and the `price` of the matching product.
      1. Respond to the client with the row that was inserted into the `cartItems` table, plus some additional information about the product they added.
  - Before doing anything else, validate the `productId` in the request body. If it is invalid, respond with a `400` error.
  - You'll be building a `Promise` chain beginning with attempting to select the `"price"` of the product with the matching `"productId"`. Attach 3 `.then()` callbacks in a chain followed by a `.catch()` that passes the `err` to `next()`. The return value of each callback of the promise chain will be fed into the next callback in the chain.
  - In the first `.then()` of the chain, do the following:
      - If there are no rows in the query result, `throw` a `new ClientError` containing a helpful message and a `400` status code.
      - **`return` the following `Promise` chain:** Insert a new row into the `"cartId"` and `"createdAt"` columns of the `"carts"` table using the `default` keyword like so:
          ```sql
          insert into "carts" ("cartId", "createdAt")
          values (default, default)
          returning "cartId"
          ```
        `then()` 😉, return the created `cartId` as well as the `price` you retrieved in an object.
  - In the second `.then()` of the chain do the following:
      - For debugging purposes, `console.log()` the parameter passed into this callback to verify that you are getting the new `cartId` and `price` in that object. If not, **DON'T MOVE ON**. Otherwise, remove the `console.log()` and continue.
      - Assign the `cartId` you got to the `cartId` property of the `req.session` object.
      - **`return` the following `Promise` chain:** Insert a new row `("cartId", "productId", "price")` into the `"cartItems"` table and retrieve the `"cartItemId"` like so:
          ```sql
          insert into "cartItems" ("cartId", "productId", "price")
          values ($1, $2, $3)
          returning "cartItemId"
          ```
  - In the third and final `.then()` of the chain do the following:
      - For debugging purposes, `console.log()` the parameter passed into this callback to verify that you are getting the new `cartItemId`. If not, **DON'T MOVE ON**. Otherwise, remove the `console.log()` and continue.
      - **`return` the following `Promise` chain:** Query the database for the cart item information that matches the new `"cartItemId"` along with some of the product information using a **`join`** clause. Because the `"products"` table and the `"cartItems"` table both contain a `"productId"`, we can instruct the database to link those to tables like so:
          ```sql
          select "c"."cartItemId",
                "c"."price",
                "p"."productId",
                "p"."image",
                "p"."name",
                "p"."shortDescription"
            from "cartItems" as "c"
            join "products" as "p" using ("productId")
          where "c"."cartItemId" = $1
          ```
      - Having retrieved the `cartItemId`, `price`, `productId`, `image`, `name`, and `shortDescription`, respond to the client with a `201` status code along with the cart item.
      - Verify that sending a `POST` request to your endpoint creates a new row in the `"carts"` table and a new row in the `"cartItems"` table.
  - Now that your endpoint creates new entries in `"carts"` and `"cartItems"`, modify your first `.then()` of the above `Promise` chain to add a conditional statement that re-uses the existing `cartId` in the `req.session` (if it exists) instead of inserting a new row into the `"carts"` table.
- Finally, return to your `GET` endpoint for `/api/cart` and modify it to include a conditional. If the `req.session` does not have a `cartId` property, then respond with an empty array. Otherwise, get all of the items that the client has added to their cart using the **`req.session.cartId`** like so:
    ```sql
    select "c"."cartItemId",
           "c"."price",
           "p"."productId",
           "p"."image",
           "p"."name",
           "p"."shortDescription"
      from "cartItems" as "c"
      join "products" as "p" using ("productId")
     where "c"."cartId" = $1
    ```

## Example `POST` Request

```
POST /api/cart HTTP/1.1
Accept: application/json, */*
Accept-Encoding: gzip, deflate
Connection: keep-alive
Content-Length: 16
Content-Type: application/json
Host: localhost:3000
User-Agent: HTTPie/1.0.3

{
    "productId": 1
}

```

## Example `POST` Response

Notice the [`set-cookie` header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie). There should now be a session stored in `server/sessions/`.

```
HTTP/1.1 201 Created
connection: close
content-length: 195
content-type: application/json; charset=utf-8
date: Tue, 14 Jan 2020 15:29:50 GMT
etag: W/"c3-EFNCZk1vQFADRMRxkLBapuN999o"
set-cookie: connect.sid=s%3ABRSMJRatFjwRugbizJ2CH5Gq7_7P1TkI.nW8ni%2FX12zu6x5hihZsCSns10Xj8wpdVYHkqJLIQ96Q; Path=/; HttpOnly; SameSite=Strict
x-powered-by: Express

{
    "cartItemId": 1,
    "image": "/images/shake-weight.jpg",
    "name": "Shake Weight",
    "price": 2999,
    "productId": 1,
    "shortDescription": "Dynamic Inertia technology ignites muscles in arms, shoulders, and chest."
}

```

## Example `GET` Request

There should be a [`Cookie` header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cookie) if your implementation is correct.

```
GET /api/cart HTTP/1.1
Accept: application/json, */*
Accept-Encoding: gzip, deflate
Connection: keep-alive
Cookie: connect.sid=s%3ABRSMJRatFjwRugbizJ2CH5Gq7_7P1TkI.nW8ni%2FX12zu6x5hihZsCSns10Xj8wpdVYHkqJLIQ96Q
Host: localhost:3000
User-Agent: HTTPie/1.0.3

```

## Example `GET` Response

Any items added to the cart should be included in the response body.

```
HTTP/1.1 200 OK
connection: close
content-length: 197
content-type: application/json; charset=utf-8
date: Tue, 14 Jan 2020 15:32:22 GMT
etag: W/"c5-wiljZwp7orF/C57wyvW9pnU0c3I"
set-cookie: connect.sid=s%3ABRSMJRatFjwRugbizJ2CH5Gq7_7P1TkI.nW8ni%2FX12zu6x5hihZsCSns10Xj8wpdVYHkqJLIQ96Q; Path=/; HttpOnly; SameSite=Strict
x-powered-by: Express

[
    {
        "cartItemId": 1,
        "image": "/images/shake-weight.jpg",
        "name": "Shake Weight",
        "price": 2999,
        "productId": 1,
        "shortDescription": "Dynamic Inertia technology ignites muscles in arms, shoulders, and chest."
    }
]

```
