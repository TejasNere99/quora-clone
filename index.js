const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

let posts = [
    {
        id: uuidv4(),
        username: "Tejas",
        content: "Hello everyone 👋, I just started learning full-stack development! Any advice for balancing backend and frontend while practicing projects?"
    },
    {
        id: uuidv4(),
        username: "Sahil",
        content: "Why do people prefer JavaScript frameworks like React or Vue over plain HTML, CSS, and JS for web apps? Are they worth the hype?"
    },
    {
        id: uuidv4(),
        username: "Atharva",
        content: "I read about the future of AI coding assistants — do you think developers might rely too much on them and lose problem-solving skills?"
    },
    {
        id: uuidv4(),
        username: "Rohit",
        content: "How do you stay consistent while learning to code daily? I start strong but lose motivation after a week 😅. Any tips?"
    },
    {
        id: uuidv4(),
        username: "Aditya",
        content: "Can someone explain the concept of REST APIs in simple terms? I get confused between endpoints, routes, and methods 😕."
    },
    {
        id: uuidv4(),
        username: "Siddharth",
        content: "What’s your opinion on remote work vs office work for software engineers? Which one helps you stay more productive?"
    },

];

app.get('/', (req, res) => {
    res.send('Main page');
});

app.get('/posts', (req, res) => {
    res.render('index', { posts });
});

app.get('/posts/new', (req, res) => {
    res.render('new');
});

app.get('/posts/:id', (req, res) => {
    let id = req.params.id;
    let post = posts.find((p) => id == p.id);
    // let post;
    // for(let p of posts){
    //     if(id==p.id){
    //         post = p;
    //         break;
    //     }
    // }
    // res.send("working");
    res.render('show', { post });
});

app.get('/posts/:id/edit', (req, res) => {
    let id = req.params.id;
    let post = posts.find((p) => id == p.id);
    res.render('edit', { post });
});

app.post('/posts', (req, res) => {
    let obj = req.body;
    let post = {
        id: uuidv4(),
        username: obj.username,
        content: obj.content
    };
    posts.push(post);
    res.redirect('/posts');
});

app.patch('/posts/:id', (req, res) => {
    let id = req.params.id;
    let post = posts.find((p) => id == p.id);
    let newContent = req.body.content;
    post.content = newContent;
    res.redirect('/posts');
});

app.delete('/posts/:id', (req, res) => {
    // method to delete element from  an array : arr = arr.filter(item => item !== 30);
    let id = req.params.id;
    let post = posts.find((p) => id == p.id);
    posts = posts.filter(p => p !== post);
    res.redirect('/posts');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
