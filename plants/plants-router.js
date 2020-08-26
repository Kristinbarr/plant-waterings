const express = require('express')
const Plants = require('./plants-model')

const router = express.Router()

// GET all plants
router.get('/', async (req, res) => {
  try {
    const plants = await Plants.find()
    if (plants) {
      res.status(200).json(plants)
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error finding plants',
    })
  }
})

// GET plant by id
router.get('/:id', async (req, res) => {
  try {
    const plant = await Plants.findById(req.params.id)
    if (plant) {
      res.status(200).json(plant)
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error getting the plant',
    })
  }
})

// POST a new plant
router.post('/', async (req, res) => {
  try {
    // TODO: make sure plant doesn't exist already

    const newPlant = await Plants.insert(req.body)
    if (newPlant) {
      res.status(201).json(newPlant)
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error adding the plant',
    })
  }
})

// UPDATE a plant
router.put('/:id', async (req, res) => {
  try {
    // TODO: make sure plant exists
    const updatedPlant = await Plants.update(req.params.id, req.body)
    if (updatedPlant) {
      res.status(200).json(updatedPlant)
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error updating the plant',
    })
  }
})

// DELETE a plant
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Plants.remove(req.params.id)
    if (deleted === 1) {
      res.status(200).json(deleted)
    } else if (deleted === 0) {
      res.status(400).json({ message: 'Plant does not exist' })
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting the plant'
    })
  }
})


// custom middleware

// function validatePlantId(req, res, next) {

// };

module.exports = router
