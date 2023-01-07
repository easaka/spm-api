const express = require('express')
const projectModel = require('../Models/project')
const router = express.Router()


//create project
router.post('/new',async (req,res)=>{
    const project = new projectModel({
        project:req.body.project,
        task:req.body.task,
        user:req.body.user
    })
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
      } catch (error) {
          res.status(400).json({message: error.message})
      }
})



module.exports = router;
