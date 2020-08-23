const express = 'express'
const Plants = require('./plants-model')

const router = express.Router()

router.get('/plants', (req, res) => {
  Plants.find()
    .then(plants => {
      res.status(200).json(plants)
    }).catch(err => {
      res.status(400).json({

      })
    })
})

router.get('/:id', (req, res) => {})

router.delete('/:id', (req, res) => {})

router.put('/:id', (req, res) => {})

// custom middleware

// function validatePostId(req, res, next) {

// };

module.exports = router
