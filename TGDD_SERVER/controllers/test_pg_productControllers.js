const getProducts = (request, response) => {
  pool.query(
    "SELECT * FROM public.product ORDER BY product_id ASC",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

module.exports = { getProducts };
