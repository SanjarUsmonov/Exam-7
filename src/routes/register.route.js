const { Router } = require("express");

const router = Router();

const { POST_USER, GET_USER } = require("../controllers/register");

router.post("/post", POST_USER);
router.get("/get", GET_USER);

module.exports = router;
