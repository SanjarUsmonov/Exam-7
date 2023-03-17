const { Router } = require("express");

const router = Router();

const { BLOG, GET_BLOG } = require("../controllers/blog");

router.post("/blog", BLOG);
router.get("/blog", GET_BLOG);

module.exports = router;
