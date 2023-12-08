const test_pg_productController = require("../controllers/test_pg_productControllers").default;
const { middlewareController } = require("../middlewares/validateToken");

const router = require("express").Router();

router.get("/", test_pg_productController);

module.exports = router;
