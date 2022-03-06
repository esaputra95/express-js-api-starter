const express = require("express");
const router = express.Router();

const gift = require("./../../controllers/GiftControllers")

router.get("/", gift.getAll)
router.get("/:id", gift.getOne)
router.post("/", gift.post)
router.delete("/:id", gift.deleteOne)
router.put('/:id', gift.update)
router.post('/:id/redeem', gift.redeem)
router.post('/:id/rating', gift.rating)
router.post('/stok', gift.addStok)

module.exports = router;