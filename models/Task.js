const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    description:{type:String,required:true},
    completed:{type:Boolean,default:false},
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }

},{
    timestamps:true
});

taskSchema.pre('save',async function(next){
    const user =this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8);
    }

    next();
})

const Task = mongoose.model('Task',taskSchema);
module.exports=Task;
