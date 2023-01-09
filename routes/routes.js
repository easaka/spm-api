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
        const dataToSave = await project.save();
        res.status(200).json(dataToSave)
      } catch (error) {
          res.status(400).json({message: error.message})
      }
})

//get all projects
router.get('/all',async (req,res)=>{
    try {
        const project = await projectModel.find()
        res.json(project)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//get one project
router.get('/:id',async (req,res)=>{
    try {
        const project = await projectModel.findById(req.params.id)
        res.json(project)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


module.exports = router;
