///Product Data

[
  {
    id: 1,
    title: "Nike Air Max 2024",
    description:
      "Experience unmatched comfort with Nike Air Max 2024. Designed for performance and style.",
    price: 149.99,
    discounted_price: 129.99,
    currency: "USD",
    category: "Shoes",
    brand: "Nike",
    colors: ["Black", "White", "Red", "Blue"],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
    stock: 25,
    is_in_stock: true,
    rating: 4.7,
    reviews_count: 156,
    images: [
      "https://example.com/images/nike_air_max_1.jpg",
      "https://example.com/images/nike_air_max_2.jpg",
    ],
    features: [
      "Breathable mesh upper",
      "Lightweight cushioning",
      "Durable rubber outsole",
      "Responsive Air Max sole",
    ],
    shipping_info: {
      free_shipping: true,
      estimated_delivery: "3-5 business days",
      return_policy: "30-day return policy",
    },
    seller: {
      name: "Nike Official Store",
      rating: 4.8,
      reviews_count: 1200,
    },
    tags: ["running shoes", "sportswear", "athletic", "casual"],
  },
  {
    id: 2,
    title: "Apple iPhone 15 Pro",
    description:
      "Apple iPhone 15 Pro with A17 Bionic chip and 120Hz ProMotion display.",
    price: 1299.99,
    discounted_price: 1199.99,
    currency: "USD",
    category: "Electronics",
    brand: "Apple",
    colors: ["Black", "Silver", "Blue", "Gold"],
    storage_options: ["128GB", "256GB", "512GB", "1TB"],
    stock: 50,
    is_in_stock: true,
    rating: 4.9,
    reviews_count: 300,
    images: [
      "https://example.com/images/iphone15_1.jpg",
      "https://example.com/images/iphone15_2.jpg",
    ],
    features: [
      "A17 Bionic chip",
      "Super Retina XDR display",
      "ProMotion 120Hz refresh rate",
      "Triple-lens camera with LiDAR",
    ],
    shipping_info: {
      free_shipping: true,
      estimated_delivery: "2-4 business days",
      return_policy: "14-day return policy",
    },
    seller: {
      name: "Apple Official Store",
      rating: 4.9,
      reviews_count: 2500,
    },
    tags: ["smartphone", "5G", "Apple", "flagship"],
  },
];


/////Admin Data
{
  "id": 101,
  "name": "John Admin",
  "email": "admin@example.com",
  "role": "admin",
  "permissions": ["manage_products", "view_orders", "manage_users"]
}


///Orders Managed by Admin
[
  {
    "order_id": 5001,
    "user_id": 201,
    "product_id": 1,
    "quantity": 1,
    "total_price": 129.99,
    "status": "Shipped",
    "tracking_id": "TRACK12345",
    "payment_status": "Paid",
    "delivery_address": {
      "street": "123 Main St",
      "city": "Los Angeles",
      "state": "CA",
      "zip": "90001"
    }
  }
]


//// 3. User Data (Buyers)
{
  "id": 201,
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "password": "hashedpassword123",
  "phone": "+1 555-1234",
  "address": {
    "street": "456 Elm St",
    "city": "New York",
    "state": "NY",
    "zip": "10001"
  }
  "order_history": [
    {
      "order_id": 5001,
      "product": "Nike Air Max 2024",
      "status": "Shipped",
      "tracking_id": "TRACK12345"
    }
  ]
}
