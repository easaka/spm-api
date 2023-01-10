const express = require('express')
const projectModel = require('../Models/project')

// create a project

const create = async (req,res)=>{
    const project = new projectModel({
        project:req.body.project,
        task:req.body.task,
        user:req.body.user
    })
    try {
        const dataToSave = await project.save();
        res.status(200).json(dataToSave)
      } catch (error) {
          res.status(500).json({message: error.message})
      }
}

//show all
const showAll = async (req,res)=>{
    try {
        const project = await projectModel.find()
        res.json(project)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


module.exports = {
    create,
    showAll
}
