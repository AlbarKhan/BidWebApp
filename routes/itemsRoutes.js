const itemsController = require("../controller/itemsController");
const router = require("express").Router();

router.post("/addItem", itemsController.addItem);
router.post("/:id", itemsController.updateItem);

router.get("/:id", itemsController.getSingleItem);
router.get("/items", itemsController.getAllItems);

router.delete("/:id", itemsController.deleteIem);
module.exports = router;
