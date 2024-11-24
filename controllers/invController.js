const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* **********************
* Build inventory item detail view
* **********************/
invCont.buildByItemId = async function (req, res, next) {
  //get inventory from the request
  const inv_id = req.params.itemId
  //use inventory id to get inventory based on id
  const data = await invModel.getItemById(inv_id)
  //build view with the vehicles/inventory results
  const grid = await utilities.buildItemGrid(data)
  //get nav
  let nav = await utilities.getNav()
  //create a title for the page
  const itemName = data[0].inv_make
  const itemModel = data[0].inv_model
  //render page
  res.render("./inventory/detail", {
    title:`${itemName} ${itemModel}`,
    nav,
    grid,
    errors: null,
  })
}

module.exports = invCont






