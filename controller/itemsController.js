const { where } = require("sequelize");
const createError = require("../utils/appError");
const db = require("../models");

const Items = db.items;

// add Itms
const addItem = async (req, res, next) => {
  try {
    const item = await Items.findOne({ where: { name: req.body.name } });
    if (item) {
      return next(
        new createError("Item With a Same Name already Exists! ", 400)
      );
    }
    const newItem = await Items.create({
      ...req.body,
    });
    res.status(200).json({
      status: "success",
      message: "Items  added succesfully",
      item: {
        id: newItem.id,
        name: newItem.name,
        description: newItem.description,
        starting_price: newItem.starting_price,
        current_price: newItem.current_price,
        image_url: newItem.image_url,
        end_time: newItem.end_time,
        created_at: newItem.created_at,
      },
    });
  } catch (err) {
    next(err);
  }
};

// getAll Items
const getAllItems = async (req, res, next) => {
  try {
    let items = await Items.findAll({});
    res.status(200).send(items);
  } catch (err) {
    next(err);
  }
};

// get Single Item by Id

const getSingleItem = async (req, res, next) => {
  try {
    const id = req.params.id;
    const item = await Items.findOne({ where: { id: id } });
    res.status(200).send(item);
  } catch (err) {
    next(err);
  }
};

// update Item

const updateItem = async (req, res, next) => {
  try {
    const id = req.params.id;

    const [updated] = await Items.update(req.body, { where: { id: id } });

    if (updated) {
      const updatedItem = await Items.findOne({ where: { id: id } });

      res.status(200).json({
        status: "success",
        message: "Item updated successfully",
        item: {
          id: updatedItem.id,
          name: updatedItem.name,
          description: updatedItem.description,
          starting_price: updatedItem.starting_price,
          current_price: updatedItem.current_price,
          image_url: updatedItem.image_url,
          end_time: updatedItem.end_time,
          created_at: updatedItem.created_at,
        },
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Item not found",
      });
    }
  } catch (err) {
    next(err);
  }
};

// delete item

const deleteIem = async (req, res, next) => {
  const id = req.params.id;
  const Item = await Items.destroy({ where: { id: id } });
  res.status(200).send("Product Deleted Succesfullys");
};

module.exports = {
  addItem,
  getAllItems,
  getSingleItem,
  updateItem,
  deleteIem,
};
