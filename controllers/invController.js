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

/* **********************
* Build vehicle Management view 
* **********************/
invCont.buildVehicleMngmt = async function (req,res,next){
  let nav = await utilities.getNav()
  let classificationSelect = await utilities.buildClassificationList();

  res.render("inventory/management", {
    title:"Vehicle Management",
    nav,
    errors: null,
    classificationSelect,
  })
}

/* **********************
* Build ADD CLASSIFICATION form view
* **********************/
invCont.buildAddClassification = async function (req, res, next){
  let nav = await utilities.getNav()
  res.render("inventory/add-classification", {
    title:"Add Classification",
    nav,
    errors: null,
  })
}

/* ******************
Process ADD CLASSIFICATION data
******************** */
invCont.addClassificationName = async function (req, res, next) {
  
  const { classification_name } = req.body

  const addClassResult = await invModel.addClassificationName(classification_name);
  let nav = await utilities.getNav()
  if (addClassResult) {
    req.flash(
      "notice",
      `Classification ${classification_name} was successfully added.`
    );
    res.render("inventory/management",{
      title: "Vehicle Management",
      errors: null,
      nav,
      classification_name, 
    });
  } else {
    req.flash("notice", "Sorry, new classification couldn't be added.")
    res.status(501).render("inventory/add-classification", {
      title: "Add Classification",
      errors: null,
      nav,
      classification_name,
    })
  }
}

/* **********************
* Build ADD INVENTORY view
* **********************/
invCont.buildAddInv = async function (req,res,next){
  let nav = await utilities.getNav()
  let classificationDropdown = await utilities.buildClassificationList();

  res.render("inventory/add-inventory", {
    title:"Add New Vehicle",
    nav,
    errors: null,
    classificationDropdown,
  });
};

/* ******************
Process ADD NEW INVENTORY data
******************** */
invCont.addInvData = async function (req, res) {
  const nav = await utilities.getNav();
 
  const { 
    classification_id, 
    inv_make,
    inv_model, 
    inv_description, 
    inv_image, 
    inv_thumbnail, 
    inv_price, 
    inv_year, 
    inv_miles, 
    inv_color 
  } = req.body
  
  const addInvResult = await invModel.addInvData(
    classification_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color
  );

  if (addInvResult) {
    req.flash (
      "notice",
      `Congratulations! New vehicle was added.`
    );
    const classificationSelect = await utilities.buildClassificationList(classification_id); 
    res.render("inventory/management", {
      title: "Vehicle Management",
      nav,
      errors: null,
      classificationSelect,
    });
  } else {
    req.flash("notice", "Sorry, the vehicle was not added.");
    res.render("inventory/add-inventory", {
      title: "Add New Vehicle",
      nav,
      errors: null,
    });
  }
}

module.exports = invCont






