
# Node E_comerce API breakdown




## API Reference

#### Register new User
```http
  POST /api/v1/users/register
```

#### Request Body
| Parameter   | Type     | Description                     |
| :---------- | :------- | :------------------------------ |
| `name`      | `string` | **Required**. The user's name   |
| `email`     | `string` | **Required**. The user's email  |
| `password`  | `string` | **Required**. The user's password |

#### Example
```json
{
  "name": "Remon",
  "email": "Remon@gmail.com",
  "password": "password1"
}
```


### Login User
```http
  POST /api/v1/users/login
```

#### Request Body
| Parameter   | Type     | Description                     |
| :---------- | :------- | :------------------------------ |
| `email`     | `string` | **Required**. The user's email  |
| `password`  | `string` | **Required**. The user's password |

#### Example
```json
{
  "email": "Remon@gmail.com",
  "password": "password1"
}
```

### Reset User Password
```http
  POST /api/v1/users/resetPassword
```

#### Request Body
| Parameter   | Type     | Description                     |
| :---------- | :------- | :------------------------------ |
| `oldPassword`     | `string` | **Required**. The user's email  |
| `newPassword`  | `string` | **Required**. The user's password |

#### Example
```json
{
    "oldPassword":"password5",
    "newPassword":"password1"
}
```

### Get all Products
```http
  GET /api/v1/products/
```

#### Request Body


### GET product using Name
```http
  GET api/v1/products/search?name=iPhone
```

#### Request Params (Query String)
| Key   | Type     | Description                     |
| :---------- | :------- | :------------------------------ |
| `name`     | `string` |  |



### Get Seller Products (restricted to seller)
```http
  GET /api/v1/products/myProducts
```

#### Request Headers

| Parameter   | Type     | Description                     |
| :---------- | :------- | :------------------------------ |
| `Authorization`| `Token` | **Required**. The user's Token  



### POST  add new Product (restricted to seller)
```http
  POST /api/v1/products/myProducts
```

#### Request Body
| Parameter   | Type     | Description                     |
| :---------- | :------- | :------------------------------ |
| `name`     | `string` | **Required**.  product name  |
| `disc`  | `string` | **Required**. product disc|
| `image`  | `string` | **Required**. product image |
| `price`  | `number` | **Required**. product price |

#### Example
```json
{
    "name":"Samsung 25ultra 256GB",
    "disc":"High end samsung phone with latest naxuis chip",
    "price":55000,
    "image":"https://example.com/images/Samsungs24Ultra.jpg"
}
```



### DELETE  Product (restricted to seller)
```http
  DELETE /api/v1/products/myProducts/:id
```

#### Request Headers
| Parameter   | Type     | Description                     |
| :---------- | :------- | :------------------------------ |
| `Authorization| `token` | **Required**.  token |


### UPDATE  Product (restricted to seller)
```http
  PATCH /api/v1/products/myProducts/:id
```

#### Request Headers
| Parameter   | Type     | Description                     |
| :---------- | :------- | :------------------------------ |
| `Authorization| `token` | **Required**.  token |
| `ProductID| `string` | **Required**.  product Id |


### Get User Cart (restricted to Customers)
```http
  GET /api/v1/cart/myCart
```

#### Request Headers

| Parameter   | Type     | Description                     |
| :---------- | :------- | :------------------------------ |
| `Authorization`| `Token` | **Required**. The user's Token  



### POST User Cart (restricted to Customers)
```http
  GET /api/v1/cart/myCart
```

#### Request Body

| Parameter   | Type     | Description                     |
| :---------- | :------- | :------------------------------ |
| `Authorization`| `Token` | **Required**. The user's Token  


#### Example
```json
{
    "productId":"68d409f873ed74f16822adc4",
    "quantity":2
}
```


### UPDATE User Cart (restricted to Customers)
```http
  GET /api/v1/cart/myCart/:id
```

#### Request Body

| Parameter   | Type     | Description                     |
| :---------- | :------- | :------------------------------ |
| `quantity`| `number` | quantity is required


#### Example
```json
{
    "quantity":2
}
```







