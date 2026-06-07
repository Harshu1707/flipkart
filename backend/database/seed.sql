USE flipkart_clone;

INSERT INTO users (name,email,password_hash,phone,role) VALUES
('Admin','admin@flipkart.test','pbkdf2_sha256$310000$sL7LpcZM2gz4Cb6mDJCYRQ==$gP1VD5SLSP16cWA/NaZbdeUPWJ0Bz2sZCY/6uWJDN7I=','9999999999','admin'),
('Demo User','user@flipkart.test','pbkdf2_sha256$310000$sL7LpcZM2gz4Cb6mDJCYRQ==$gP1VD5SLSP16cWA/NaZbdeUPWJ0Bz2sZCY/6uWJDN7I=','8888888888','user');

INSERT INTO categories (id,name,slug,image_url,sort_order) VALUES
(1,'Mobiles','mobiles','https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',1),
(2,'Electronics','electronics','https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400',2),
(3,'Fashion','fashion','https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400',3),
(4,'Home','home','https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400',4),
(5,'Appliances','appliances','https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',5);

INSERT INTO products (id,category_id,name,slug,brand,description,price,mrp,stock,rating_avg,rating_count,is_featured) VALUES
(1,1,'Pixel Pro 9 5G','pixel-pro-9-5g','Google','Flagship 5G phone with AI camera, OLED display, and all-day battery.',74999,89999,35,4.6,128,1),
(2,1,'Galaxy M Power','galaxy-m-power','Samsung','Massive battery smartphone with vivid display and smooth performance.',18999,24999,80,4.3,94,1),
(3,2,'Noise Cancelling Headphones','noise-cancelling-headphones','SoundMax','Wireless ANC headphones with 40-hour playback and fast charging.',5999,9999,120,4.4,211,1),
(4,2,'UltraBook Air 14','ultrabook-air-14','Acer','Thin laptop with 16GB RAM, 512GB SSD, and backlit keyboard.',52999,68999,24,4.5,71,1),
(5,3,'Men Cotton Casual Shirt','men-cotton-casual-shirt','Roadster','Slim-fit breathable shirt for everyday wear.',799,1799,200,4.1,320,0),
(6,3,'Women Running Shoes','women-running-shoes','Puma','Lightweight running shoes with cushioned sole.',2299,4999,95,4.2,167,1),
(7,4,'Ergonomic Office Chair','ergonomic-office-chair','GreenSoul','Adjustable mesh chair for long working hours.',7999,12999,40,4.4,88,1),
(8,5,'Smart Inverter Refrigerator','smart-inverter-refrigerator','LG','Double-door refrigerator with smart inverter compressor.',34999,48999,18,4.5,56,0);

INSERT INTO product_images (product_id,url,is_primary) VALUES
(1,'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=700',1),
(2,'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=700',1),
(3,'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700',1),
(4,'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=700',1),
(5,'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=700',1),
(6,'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700',1),
(7,'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=700',1),
(8,'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=700',1);

INSERT INTO reviews (user_id,product_id,rating,comment) VALUES
(2,1,5,'Great camera and display.'),(2,3,4,'Excellent ANC for the price.');
