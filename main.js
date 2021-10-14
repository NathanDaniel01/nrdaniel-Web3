const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000

const taskSchema = new mongoose.Schema({
  name: String,
  dueDate: String,
  priority: String,
  description: String,
  tag: String
});
const Task = mongoose.model('Task', taskSchema);

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin',"*");
  next();
});

app.get('/', (req, res) => {
  console.log(__dirname)
  res.sendFile(__dirname + "/index.html");
})
app.get('/bye', (req, res) => {
  res.send('Bye for now!')
})

app.route('/testdb')
.get((req,res) => {
    mongoose.connect('mongodb://localhost:27017/test');
    const testTask = new Task({ name: 'HW1',
                            dueDate: 'Oct 13',
                            priority: 'High',
                            description: 'Api Creation',
                            tag: 'Web3' 
                          });
    testTask.save()
	.then((result)=>{
	    console.log(testTask);
      res.send(testTask);
	});
});


app.route('/POST/:name/:dueDate/:priority/:description/:tag')
.post((req,res) => {
    mongoose.connect('mongodb://localhost:27017/test');
    const task = new Task({ name: req.params['name'],
                                dueDate: req.params['dueDate'],
                                priority: req.params['priority'],
                                description: req.params['description'],
                                tag: req.params['tag'] ,
                      });
    task.save()
	.then((result)=>{
	    console.log(task);
	    res.send(task);
	});
})
.get((req,res) => {
  mongoose.connect('mongodb://localhost:27017/test');
  const task = new Task({ name: req.params['name'],
                              dueDate: req.params['dueDate'],
                              priority: req.params['priority'],
                              description: req.params['description'],
                              tag: req.params['tag'] ,
                    });
  task.save()
.then((result)=>{
    console.log(task);
    res.send(task);
});
});
async function getTask(req,res) {
  mongoose.connect('mongodb://localhost:27017/test');
  try {
    const results = await Task.find({});
    console.log(results);
    res.json(results);
    console.log("weeee")
  } catch (err) {
    throw err;
  }
}
app.route('/get')
.get((req,res) => {
  getTask(req,res)
  .then(()=>{ console.log(res); })
});


//-+_+_+_+_+_+_+_+_+_
//GET – to fetch data
//PUT – to edit existing data
//POST – to add the new data
//DELETE – to delete data

app.listen(port, () => {
  console.log(`Todo list RESTfull API: listening at http://localhost:${port}`)
})
module.exports = app;
