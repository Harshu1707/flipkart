const slugify = require('slugify');
const cloudinary = require('../config/cloudinary');
const { query, transaction } = require('../config/db');
const ApiError = require('../utils/apiError');
const asyncHandler = require('../utils/asyncHandler');

async function attachImages(products) {
  if (!products.length) return products;
  const ids = products.map((p) => p.id);
  const placeholders = ids.map((_, i) => `:id${i}`).join(',');
  const params = Object.fromEntries(ids.map((id, i) => [`id${i}`, id]));
  const images = await query(`SELECT * FROM product_images WHERE product_id IN (${placeholders}) ORDER BY is_primary DESC, id ASC`, params);
  return products.map((p) => ({ ...p, images: images.filter((img) => img.product_id === p.id) }));
}

exports.list = asyncHandler(async (req, res) => {
  const page = Math.max(Number(req.query.page || 1), 1);
  const limit = Math.min(Math.max(Number(req.query.limit || 12), 1), 48);
  const offset = (page - 1) * limit;
  const sortMap = { newest: 'p.created_at DESC', price_asc: 'p.price ASC', price_desc: 'p.price DESC', rating: 'p.rating_avg DESC' };
  const where = ['p.is_active = 1'];
  const params = { limit, offset };
  if (req.query.search) { where.push('(p.name LIKE :search OR p.description LIKE :search OR p.brand LIKE :search)'); params.search = `%${req.query.search}%`; }
  if (req.query.category) { where.push('(c.slug = :category OR c.id = :category)'); params.category = req.query.category; }
  if (req.query.minPrice) { where.push('p.price >= :minPrice'); params.minPrice = Number(req.query.minPrice); }
  if (req.query.maxPrice) { where.push('p.price <= :maxPrice'); params.maxPrice = Number(req.query.maxPrice); }
  const sqlWhere = `WHERE ${where.join(' AND ')}`;
  const products = await query(`SELECT p.*, c.name category_name, c.slug category_slug FROM products p LEFT JOIN categories c ON c.id=p.category_id ${sqlWhere} ORDER BY ${sortMap[req.query.sort] || sortMap.newest} LIMIT :limit OFFSET :offset`, params);
  const totalRows = await query(`SELECT COUNT(*) total FROM products p LEFT JOIN categories c ON c.id=p.category_id ${sqlWhere}`, params);
  res.json({ success: true, data: await attachImages(products), meta: { page, limit, total: totalRows[0].total, pages: Math.ceil(totalRows[0].total / limit) } });
});

exports.featured = asyncHandler(async (_req, res) => {
  const products = await query('SELECT p.*, c.name category_name FROM products p LEFT JOIN categories c ON c.id=p.category_id WHERE p.is_featured = 1 AND p.is_active = 1 ORDER BY p.created_at DESC LIMIT 16');
  res.json({ success: true, data: await attachImages(products) });
});

exports.get = asyncHandler(async (req, res) => {
  const rows = await query('SELECT p.*, c.name category_name, c.slug category_slug FROM products p LEFT JOIN categories c ON c.id=p.category_id WHERE (p.id = :id OR p.slug = :id) AND p.is_active = 1', { id: req.params.id });
  if (!rows.length) throw new ApiError(404, 'Product not found');
  const product = (await attachImages(rows))[0];
  const reviews = await query('SELECT r.*, u.name user_name FROM reviews r JOIN users u ON u.id=r.user_id WHERE r.product_id=:id ORDER BY r.created_at DESC', { id: product.id });
  res.json({ success: true, data: { ...product, reviews } });
});

exports.create = asyncHandler(async (req, res) => {
  const body = req.body;
  const slug = slugify(body.slug || body.name, { lower: true, strict: true });
  const result = await query('INSERT INTO products (category_id,name,slug,brand,description,price,mrp,stock,rating_avg,is_featured,is_active) VALUES (:category_id,:name,:slug,:brand,:description,:price,:mrp,:stock,0,:is_featured,1)', { ...body, slug, is_featured: body.is_featured ? 1 : 0 });
  res.status(201).json({ success: true, id: result.insertId });
});

exports.update = asyncHandler(async (req, res) => {
  const allowed = ['category_id', 'name', 'brand', 'description', 'price', 'mrp', 'stock', 'is_featured', 'is_active'];
  const entries = allowed.filter((key) => req.body[key] !== undefined).map((key) => `${key} = :${key}`);
  if (req.body.name) { entries.push('slug = :slug'); req.body.slug = slugify(req.body.name, { lower: true, strict: true }); }
  if (!entries.length) throw new ApiError(400, 'No fields to update');
  await query(`UPDATE products SET ${entries.join(', ')} WHERE id = :id`, { ...req.body, id: req.params.id });
  res.json({ success: true });
});

exports.remove = asyncHandler(async (req, res) => {
  await query('UPDATE products SET is_active=0 WHERE id=:id', { id: req.params.id });
  res.json({ success: true });
});

exports.uploadImages = asyncHandler(async (req, res) => {
  if (!req.files?.length) throw new ApiError(400, 'At least one image is required');
  const rows = [];
  await transaction(async (conn) => {
    for (const [index, file] of req.files.entries()) {
      const dataUri = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
      const uploaded = await cloudinary.uploader.upload(dataUri, { folder: 'flipkart-clone/products' });
      const [result] = await conn.execute('INSERT INTO product_images (product_id,url,public_id,is_primary) VALUES (?,?,?,?)', [req.params.id, uploaded.secure_url, uploaded.public_id, index === 0 ? 1 : 0]);
      rows.push({ id: result.insertId, url: uploaded.secure_url });
    }
  });
  res.status(201).json({ success: true, data: rows });
});
