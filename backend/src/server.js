const app = require('./app');
const { port } = require('./config/env');
const { pool } = require('./config/db');

async function start() {
  await pool.query('SELECT 1');
  app.listen(port, () => console.log(`API running on port ${port}`));
}
start().catch((error) => {
  console.error('Failed to start server:', error.message);
  process.exit(1);
});
