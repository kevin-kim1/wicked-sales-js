# User can view the details of a product - Back End.

## Implementation

For this feature you will be defining an Express.js endpoint to handle `GET` requests to `/api/products/:productId` that sends _all_ data about a specific product in the `"products"` table.

### 💰 Motivation

The client will be displaying the details of a specific product to the user, so the endpoint should return all information about that particular product.

### ✅ Task List

- Add an endpoint to handle `GET` requests to `/api/products/:productId` just after your endpoint for `GET /api/products`.
- Within the callback, query the database for all columns of the product that matches the specified `productId`.
- If the product can't be found, call `next()` with a new `ClientError`, passing it an error message and appropriate status code.
- If querying the database fails, pass the error to `next()`.

### Tips

Be sure to return a **JSON Object** for this feature and not a **JSON Array**.

Test your endpoint with the following command. Try different `productId`s.

```
http -v get localhost:3000/api/products/1
```

Be sure to handle the following failure scenarios and test for them:
  - The `Promise` returned from querying the database is rejected (call `next()` with the error). You should be able to force a `500` by messing up your SQL query.
  - The requested product does not exist (call `next()` with a `new ClientError()`)

## Example Request

```
GET /api/products/1 HTTP/1.1
Accept: */*
Accept-Encoding: gzip, deflate
Connection: keep-alive
Host: localhost:3000
User-Agent: HTTPie/0.9.8

```

## Example Response

```
HTTP/1.1 200 OK
Cache-Control: no-store, no-cache, must-revalidate
Connection: close
Content-Type: application/json; charset=utf-8
Date: Mon, 18 Nov 2019 14:47:46 GMT
Expires: Thu, 19 Nov 1981 08:52:00 GMT
Host: localhost:3000
Pragma: no-cache

{
    "image": "/images/shake-weight.jpg",
    "longDescription": "Shaking up the way you work out, the Shake Weight is a revolution in strength training. Boasting a legion of devotees who enthusiastically confirm the Shake Weight's claim that it shapes and tones the upper body, this product is hard to ignore.\r\nThe way it works is this: a special pulsating dumbbell with dynamic inertia technology increases upper body muscle activity by 300 percent compared to traditional weights as you shake the 5-lb weight several different ways. This repetitive shaking stimulates muscle toning and adds shape to your upper arms, chest, and shoulders.\r\nThe Upper Body Sculpting DVD shows you the proper way to use the Shake Weight so you see the most benefits. It works in only six minutes a day, though if you use it more often, you're likely to see results sooner.",
    "name": "Shake Weight",
    "price": 2999,
    "productId": 1,
    "shortDescription": "Dynamic Inertia technology ignites muscles in arms, shoulders, and chest."
}
