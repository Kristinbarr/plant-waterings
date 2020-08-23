const express = require('express')
const Waterings = require('./waterings-model')

const router = express.Router()

// GET all waterings
router.get('/', async (req, res) => {
  try {
    const allWaterings = await Waterings.findAllWaterings()
    if (allWaterings) {
      res.status(200).json(allWaterings)
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error finding all waterings',
    })
  }
})

// GET waterings by plant id
router.get('/:id', async (req, res) => {
  try {
    const waterings = await Waterings.findWateringsById(req.params.id)
    if (waterings) {
      res.status(200).json(waterings)
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error getting the watering by plant id',
    })
  }
})

// POST a new watering
router.post('/:id', async (req, res) => {
  try {
    // TODO: check if watering already exists (same timestamp?)
    // TODO: possibly query for plant name insted of id
    const newWatering = { created_at: new Date(), plant_id: req.params.id }
    const newWateringRes = await Waterings.insert(newWatering)
    if (newWateringRes) {
      res.status(201).json(newWateringRes)
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error adding the watering',
    })
  }
})

// UPDATE a watering
// request body example: { created_at: "2020-08-19T19:01:47.937Z"}
router.put('/:id', async (req, res) => {
  try {
    // TODO: make sure watering exists before updating it
    const updatedWatering = await Waterings.update(req.params.id, req.body)
    if (updatedWatering) {
      res.status(200).json(updatedWatering)
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error updating the watering',
    })
  }
})

// DELETE a watering
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Waterings.remove(req.params.id)
    if (deleted) {
      res.status(200).json(deleted)
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting the watering',
    })
  }
})

module.exports = router
