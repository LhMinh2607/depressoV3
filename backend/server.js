import express from 'express'
import mongoose from "mongoose"
import forumRouter from './routers/forumRouter.js'
import dotenv from 'dotenv';
import userRouter from './routers/userRouter.js';
import categoryRouter from './routers/categoryRouter.js'

dotenv.config();
const app = express();
app.use(express.json()); //http
app.use(express.urlencoded({extended: true}));

//connect to mongodb database
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/dataStructureLW', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    },
err => {
    if(err) throw err;
    console.log('connected to MongoDB')
});


app.use('/api/forum', forumRouter);
app.use('/api/user', userRouter);
app.use('/api/category', categoryRouter);

app.get('/', (req, res) => {
    res.send('Server is ready!');
    
});

// app.get('/api/drinks', (req, res) => {
//     console.log("fuck you");
//     res.send({message: "fuck you"});
// })


app.use((err, req, res, next)=>{
    res.status(500).send({message: err.message});

});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`);
});


