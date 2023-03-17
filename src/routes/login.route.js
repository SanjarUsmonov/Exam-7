const { Router } = require("express");

const router = Router();

const { POST_LOGIN } = require("../controllers/login");

router.post("/login", POST_LOGIN);

module.exports = router;
