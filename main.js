const express = require('express');
const app = express();
const path = require('path');
const mongoose= require('mongoose');
const hbs= require('hbs');

// connecting with the mongo db
require('./public/connect');
const Register=require('./public/mongoose/register');


// setting up the static path

const static= path.join(__dirname,'./public');
app.use(express.static(static));

// setting up the template path

const tpath= path.join(__dirname,'./template/views');
app.set('view-engine','hbs');
app.set('views',tpath);

// setting up the partial path

const partialPath=path.join(__dirname,'./template/partials');
hbs.registerPartials(partialPath);

// setting the data

app.use(express.json());
app.use(express.urlencoded({extended:false}));

// setting up the routing part

app.get('/',(req,res)=>
{
    res.render('index.hbs');
})

app.get('/login.html',(req,res)=>
{
    res.render('login.hbs');
})

app.get('/gate',(req,res)=>
{
    res.render('gate.hbs');
})

app.get('/quiz',(req,res)=>
{
    res.render('quiz.hbs');
})

app.get('/computer_courses',(req,res)=>
{
    res.render('computer_courses.hbs');
})


app.get('/jee',(req,res)=>
{
    res.render('jee.hbs');
})

// post operations

app.post('/login',async (req,res)=>
{
    try
    {
   
        const username=req.body.email;
        const pass= req.body.password;
        const result= await Register.findOne({Password:pass});
    

        if(result.email===username)
        {
            console.log('sign in successfully finished!!');
            res.render('index.hbs',{sign : 'Username or password is filled correctly'});
        }
        else
        {
            console.log('sign in is not successfully finished');
            res.render('login.hbs',{sign : 'Username or password is filled incorrectly'});
        }
        
    }
    catch(err)
    {
        res.render('login.hbs',{sign : 'Username or password is filled incorrectly'});
        console.log(err);
    }
})

app.post('/register',async (req,res)=>
{
    const name= req.body.full;
    const email=req.body.email;
    const pass=req.body.password;
    const curr=req.body.current;

    if(curr===pass)
    {
        try
        {
        const data= await new Register(
            {
                name:name,
                email:email,
                Password:pass,
                Confirm:curr
            }
        );

        const result= await data.save();
        console.log(result);
        }
        catch(err)
        {
            console.log(err);
        }
    }

    res.render('login.hbs');

})
app.listen(8000,()=>
{
    console.log('server created');
});