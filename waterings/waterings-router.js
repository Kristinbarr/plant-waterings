const express = require('express')
const Waterings = require('./waterings-model')
const Plants = require('../plants/plants-model')

var StatsD = require('hot-shots')
var dogstatsd = new StatsD()
// Increment a counter.
dogstatsd.increment('page.views')
dogstatsd.timing('response_time', new Date())
dogstatsd.set(['waterings'], 42, function (error, bytes) {
  //this only gets called once after all messages have been sent
  if (error) {
    console.error('Oh noes! There was an error:', error)
  } else {
    console.log('Successfully sent', bytes, 'bytes')
  }
})

const router = express.Router()

// GET all waterings
router.get('/', async (req, res) => {
  try {
    const allWaterings = await Waterings.find()

    if (allWaterings) {
      res.status(200).json(allWaterings)
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error finding all waterings',
    })
  }
})

// GET waterings by PLANT id
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
// no request body needed, plant_id is param, timestamp is immediately generated
router.post('/:id', async (req, res) => {
  try {
    // TODO: possibly query to return plant name insted of/alongside id
    const plantExists = await Plants.findById(req.params.id)
    if (!plantExists) {
      res.status(400).json({ message: 'Plant does not exist' })
    }
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
// will need to capture specific time on the front end
// plant_id is the param
router.put('/:id', async (req, res) => {
  try {
    const wateringExists = await Waterings.findById(req.params.id)
    if (!wateringExists) {
      res.status(400).json({ message: 'Watering does not exist' })
    }
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
    if (deleted === 1) {
      res.status(200).json(deleted)
    } else if (deleted === 0) {
      res.status(400).json({ message: 'Watering does not exist' })
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting the watering',
    })
  }
})

module.exports = router
