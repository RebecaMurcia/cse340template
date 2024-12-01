const utilities = require(".")
  const { body, validationResult } = require("express-validator")
  const validate = {}

  /* **************
  ADD CLASSIFICATION server validation rules
  *************** */
 validate.classificationRules = () => {
    return [
        body("classification_name")
        .trim()
        .escape()
        .notEmpty()
        .isAlpha()
        .withMessage("A valid name is required. Use only alphabetical characters withtout space."),
    ]
 }

  /* ************
 Check data and return errors or continue adding new classification
 ************* */
 validate.checkClassData = async (req, res, next) => {
    const { classification_name } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        res.render("inventory/add-classification", {
            errors, 
            title: "Add Classification",
            nav,
            classification_name,
        })
        return
    }
    next()
}

module.exports = validate 