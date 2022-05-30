const express = require('express');
const router = express.Router();

// require the Drone model here
const DroneModel = require('../models/Drone.model')

router.get('/drones', async (req, res, next) => {
  // Iteration #2: List the drones
  try {
    
  const drones = await DroneModel.find()
  res.render("drones/list", { drones });

} catch (error) {
    console.log('Error occurred: ' , error)
}
});

router.get('/drones/create',  (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render('drones/create-form')
});

router.post('/drones/create', async (req, res, next) => {
  // Iteration #3: Add a new drone

  const newDrone = await DroneModel.create(req.body)
  res.redirect('/drones' )

});

router.get('/drones/:droneId', async (req, res) => {
  const drone = await DroneModel.findById(req.params.droneId)
  const data = { drone }
  res.render('list', data)
})


router.get('/drones/:droneId/edit', async (req, res, next) => {
  // Iteration #4: Update the drone
  try {
  const editedDrone = await DroneModel.findById(req.params.droneId)
  res.render('drones/update-form', { editedDrone }) 

} catch (error) {
  console.log('Error occurred: ' , error)
}
});


router.post('/drones/:droneId/edit', async (req, res, next) => {
  // Iteration #4: Update the drone
  try {
  const { droneId } = req.params
  await DroneModel.findByIdAndUpdate(droneId, req.body)
  res.redirect('/drones')

} catch (error) {
  console.log('Error occurred: ' , error)
}
});



router.post('/drones/:droneId/delete', async (req, res, next) => {
  // Iteration #5: Delete the drone
  try {
  await DroneModel.findByIdAndDelete(req.params.droneId)
  res.redirect('/drones')
  
} catch (error) {
  console.log('Error occurred: ' , error)
}
});



module.exports = router;
