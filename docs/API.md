# FlipShop REST API

Base URL: `http://localhost:5000/api`

Authentication uses `Authorization: Bearer <jwt>`.

## Auth
- `POST /auth/register` — `{ name, email, password, phone? }`
- `POST /auth/login` — `{ email, password }`
- `GET /auth/me` — authenticated current user

## Catalog
- `GET /categories` — active categories
- `POST /categories` — admin create category
- `PUT /categories/:id` — admin update category
- `DELETE /categories/:id` — admin soft delete category
- `GET /products?search=&category=&minPrice=&maxPrice=&sort=&page=&limit=` — searchable, sortable, paginated product list
- `GET /products/featured` — featured products
- `GET /products/:idOrSlug` — product details with reviews
- `POST /products` — admin create product
- `PUT /products/:id` — admin update product
- `DELETE /products/:id` — admin soft delete product
- `POST /products/:id/images` — admin multipart `images[]`, uploads to Cloudinary
- `POST /products/:productId/reviews` — authenticated review `{ rating, comment }`

## Cart and Wishlist
- `GET /cart`, `POST /cart`, `PUT /cart/:id`, `DELETE /cart/:id`
- `GET /wishlist`, `POST /wishlist`, `DELETE /wishlist/:productId`

## Orders and Payments
- `POST /orders/razorpay` — creates Razorpay order `{ amount }`
- `POST /orders/verify-payment` — verifies Razorpay signature
- `POST /orders` — places order from cart `{ shipping_address, payment_method, payment_id? }`
- `GET /orders/mine` — user order history
- `GET /orders` — admin order management
- `PUT /orders/:id/status` — admin order status update

## Admin
- `GET /admin/analytics` — users, products, orders, revenue, and low-stock products
- `GET /users`, `PUT /users/:id` — admin user management
