const express = require('express')
const crud = require('../public/javascripts/adminCrud')

var router = express.Router()

router.post("/", function (req, res, next) {
  // const sess = req.session;
  // if (!sess || sess.isAdmin === false) {
  //   return res.status(403).send('Pas autorisé')
  // }

  const {
    name,
    description,
    price,
    curency,
    stock,
    marque,
    categorie,
    logo,
    photo
  } = req.body
  crud.createProduct(name, description, price, curency, stock, marque, categorie, logo, photo)

})

router.post("/:id", function (req, res, next) {
  //const sess = req.session;
  //if (!sess || sess.isAdmin === false) {
  //  return res.status(403).send('Pas autorisé')
  //}

  const {
    name,
    description,
    price,
    curency,
    stock,
    marque,
    categorie,
    logo,
    photo
  } = req.body
  crud.updateProduct(req.params.id, name, description, price, curency, stock, marque, categorie, logo, photo)
  res.status(200).send({
    id: req.params.id
  })
})

router.delete("/:id", function (req, res, next) {
 // const sess = req.session;
  // if (!sess || sess.isAdmin === false) {
  //   return res.status(403).send('Pas autorisé')
  // }

  const {
    name,
    description,
    price,
    curency,
    stock,
    marque,
    categorie,
    logo,
    photo
  } = req.params
  crud.deleteProduct(req.params.id)
  res.status(200).send()
})

module.exports = router