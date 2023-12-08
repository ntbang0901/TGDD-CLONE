const Pool = require("pg");

const pool = new Pool({
      user: process.env.DB_USERNAME,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASS,
      port: process.env.DB_PORT,
    });
// const getProducts = (request, response) => {
//   pool.query(
//     "SELECT * FROM public.product ORDER BY product_id ASC",
//     (error, results) => {
//       if (error) {
//         throw error;
//       }
//       response.status(200).json(results.rows);
//     }
//   );
// };

// module.exports = {
//   pool,
//   getProducts,
// };

module.exports = {
  query: (text, params) => pool.query(text, params)
};