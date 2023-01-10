const express = require('express')
const projectModel = require('../Models/project')

// create a project

const create = async (req,res)=>{
    const project = new projectModel({
        project:req.body.project,
        task:req.body.task,
        user:req.body.user
    })

        const dataToSave = await project.save();
        res.status(200).json(dataToSave)

}

//show all
const showAll = async (req,res)=>{

        const project = await projectModel.find()
        res.json(project)


}

// show one
const showOne = async (req,res)=>{

        const project = await projectModel.findById(req.params.id)
        res.json(project)

}

// update one
const update = async (req,res)=>{

        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await projectModel.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
   
}

module.exports = {
    create,
    showAll,
    showOne,
    update
}
