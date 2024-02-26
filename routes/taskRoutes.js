const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const Task = require('../models/Task');

router.get('/test', auth, (req, res) => {
    res.json({
        message: "task routes are working",
        user: req.user
    });
});

router.post('/', auth, async (req, res) => {
    try {
        const task = new Task({
            ...req.body,
            owner: req.user._id
        });
        await task.save();


        res.status(201).json({task,message:"task created successfully"}); 
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});



// router.get('/',auth,async(req,res)=>{
//     console.log(req.user)
//     try{
//          const task = await Task.find({
//             owner:req.user._id 
            
//          })
//     }
//     catch(err){
//         res.status(500).send({error:err});
//     }
// });

router.get('/:id',async(req,res)=>{
     const taskid=req.params.id;
    try{
         const task = await Task.find({
            _id:taskid,
         });
         console.log(task);
         if(!task){
            return res.status(404).json({message:"Task not"})
         }
         res.status(200).json({task,message:"Task fetched successfully"})
    }
    catch(err){
        res.status(500).send({error:err})
    }
});


router.put('/:id',async(req,res)=>{

    const taskid=req.params.id;
    const updates= Object.keys(req.body)
    // {
    //     description:"new description",   
    //     completed:true,
    //     owner:
    // }
    const allowUpdates=['description','completed'];
    const isValidOperation = updates.every(update => allowUpdates.includes(update));

    if(!isValidOperation){
        return res.status(400).json({error:"Invalid Updates"})
    }

    try{
         const task = await Task.findOne({
            _id:taskid,
            owner:req.user._id
         })
         if(!task){
            return res.status(404).json({message:"Task not Found"})
         }
         updates.forEach(update=>task[update]=req.body[update]);
         await task.save();

         res.json({
            message:"task update successfully"
         })
    }
    catch(err){
        res.status(500).send({error:err})
    }
});

router.delete('/:id',auth,async(req,res)=>{
    const taskid = req.params.id

    try{
        const task = await Task.findOneAndDelete({
            _id:taskid,
            owner:req.user._id

        });
        if(!task){
            return res.status(404).json({message:"Task not found"});
        }
        res.status(200).json({task,message:"Task Deleted successfully"})
    }
    catch(err){
        res.status(500).send({error:err})
    }

});

module.exports = router;
 