const express= require('express');
const hbs= require('hbs');
const fs= require('fs');
const port= process.env.PORT || 3000;
var app = express();
app.set('view engine','hbs');
hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.use((request,response,next) => {
    var now =new Date().toString();
    var log =`${now} : ${request.method} ${request.url}`;
    fs.appendFile('server.log',log+'\n', (error) => {
        if(error){
            console.log(error);
        }
    });
    next();
});

// app.use((request,response,next) => {
//     response.render('maintenance.hbs');
// });

app.use(express.static(__dirname+'/public'));

app.get('/', (request,response) => {
    // response.send('<h1>Hello express JS</h1>');
    response.render('home.hbs',{
        pageTitle:'Home Page',
        welcomeMessage:'This is my website'
    })
});

app.get('/about',(request,response) => {
    response.render('about.hbs', {
        pageTitle:'About page'
    });
});

app.get('/bad',(request,response) => {
    response.send({
        errorMessage:'Error in handling the request'
    });
});

app.get('/projects', (request,response) => {
    response.render('projects.hbs',{
        pageTitle:'Projects page',
        welcomeMessage:'All portfolios here'
    });
});

app.listen(port, () => {
    console.log('Server running on port '+port);
});