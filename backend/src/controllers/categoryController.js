const slugify = require('slugify');
const { query } = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');

exports.list = asyncHandler(async (_req, res) => {
  const data = await query('SELECT * FROM categories WHERE is_active=1 ORDER BY sort_order, name');
  res.json({ success: true, data });
});
exports.create = asyncHandler(async (req, res) => {
  const slug = slugify(req.body.slug || req.body.name, { lower: true, strict: true });
  const result = await query('INSERT INTO categories (name,slug,image_url,sort_order) VALUES (:name,:slug,:image_url,:sort_order)', { ...req.body, slug, image_url: req.body.image_url || null, sort_order: req.body.sort_order || 0 });
  res.status(201).json({ success: true, id: result.insertId });
});
exports.update = asyncHandler(async (req, res) => {
  await query('UPDATE categories SET name=COALESCE(:name,name), slug=COALESCE(:slug,slug), image_url=COALESCE(:image_url,image_url), sort_order=COALESCE(:sort_order,sort_order), is_active=COALESCE(:is_active,is_active) WHERE id=:id', { id: req.params.id, name: req.body.name, slug: req.body.slug || (req.body.name ? slugify(req.body.name, { lower: true, strict: true }) : undefined), image_url: req.body.image_url, sort_order: req.body.sort_order, is_active: req.body.is_active });
  res.json({ success: true });
});
exports.remove = asyncHandler(async (req, res) => {
  await query('UPDATE categories SET is_active=0 WHERE id=:id', { id: req.params.id });
  res.json({ success: true });
});
