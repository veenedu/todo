const app = require('express')();
const PORT = 8081
const bodyParser = require('body-parser')

//Todo: spend some more time on middilewares

app.use(bodyParser())

let _count=1;
function taskGenerator(taskText){
  return {
    id: _count++,
    text:taskText,
    completed:false
  }
}

var tasks = [];
app.get('/getTasks',function(req,res){
    res.json({success:true,data:tasks})
});


app.post('/addTask',function(req,res){
  let taskText = req.body.taskText;
  let task=  taskGenerator(taskText);
  
  tasks.push(task);
  res.json({success:true})
});

app.post('/toggleTask',function(req,res){
  let taskId = req.body.taskId;
  let success=false;
  tasks= tasks.map((task)=>{
    if(task.id == taskId){
      task.completed = !task.completed;
      success = true
    }
    return task
  })

  res.json({success})
});

app.listen(PORT,function(){
  console.log(`Server running on port: ${PORT}`)
});