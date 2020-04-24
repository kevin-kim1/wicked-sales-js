# User can place an order - Back End.

## Implementation

For this feature you will be creating an endpoint to store order information in your `wickedSales` database. This will require a new table.

You will be incorporating session cookies to link customer info to a specific shopping cart.

## Tips

Pay close attention to the `server/sessions/` directory of your project. This is where your server stores data related to session cookies, including the client's `cartId`.

When you have successfully created an order, your database will record a new entry in the `orders` table. The `cartId` in your session file should also be removed.

When you have finished your implementation, be sure to dump your database again and commit it so that other developers on your team can easily import it into there own PostgreSQL server.

### 💰 Motivation

Getting paid! Once users have chosen their products from the catalog, their payment and delivery information needs to be recorded so that their order can be fulfilled.

### ✅ Task List

- Update the database schema.
  - Launch `pgweb` with the following command and visit http://localhost:8081 in your web browser.
      ```bash
      pgweb --db=wickedSales
      ```
  - Open the Query tab of `pgweb` in your browser and create a new `"orders"` table with the following SQL statement. Click **Run Query** once you've entered it. Both `"orderId"` and `"createdAt"` will be auto-generated values.
      ```sql
      create table "orders" (
        "orderId"         serial         primary key,
        "cartId"          integer        not null,
        "name"            text           not null,
        "creditCard"      text           not null,
        "shippingAddress" text           not null,
        "createdAt"       timestamptz(6) not null default now()
      );
      ```
  - Export your database schema again using `npm run db:export` and make a commit.
- Add an endpoint to your Express.js server to handle `POST` requests to `/api/orders`. The endpoint should:
  - Verify that there is a `cartId` on `req.session` or respond with a `400` error with a helpful message.
  - Verify that the `req.body` contains a `name`, `creditCard`, and `shippingAddress`.
  - Insert the `cartId`, `name`, `creditCard`, and `shippingAddress` into the `orders` table.
  - `delete` the `cartId` from `req.session` if the insert succeeded.
  - Respond with a `201` status and a JSON body including the `orderId`, `createdAt`, `name`, `creditCard`, and `shippingAddress` of the placed order.

## Example Request

```
POST /api/orders HTTP/1.1
Accept: application/json, */*
Accept-Encoding: gzip, deflate
Connection: keep-alive
Content-Length: 87
Content-Type: application/json
Cookie: connect.sid=s%3AQ269hVrn-tDFGcTtKvLSy8RN1BhDCmk4.WhI0UH882NWitMGrCjWKXkSd6hSN%2FussgPnXd7rBGnc
Host: localhost:3000
User-Agent: HTTPie/0.9.8

{
    "creditCard": "123456789",
    "name": "Tim Davis",
    "shippingAddress": "123 LearningFuze"
}

```

## Example Response

```
HTTP/1.1 201 Created
connection: close
content-length: 144
content-type: application/json; charset=utf-8
date: Wed, 15 Jan 2020 18:54:15 GMT
etag: W/"90-eg1WAcJnvOlFcjiVXXK+bHBoQco"
set-cookie: connect.sid=s%3AQ269hVrn-tDFGcTtKvLSy8RN1BhDCmk4.WhI0UH882NWitMGrCjWKXkSd6hSN%2FussgPnXd7rBGnc; Path=/; HttpOnly; SameSite=Strict
x-powered-by: Express

{
    "createdAt": "2020-01-15T18:54:15.650Z",
    "creditCard": "123456789",
    "name": "Tim Davis",
    "orderId": 1,
    "shippingAddress": "123 LearningFuze"
}

```
