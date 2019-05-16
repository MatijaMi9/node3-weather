const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//console.log(__dirname);
//console.log(path.join(__dirname,'../public')); // join returns final path for public folder



const app = express(); // make express app

// HEROKU SETUP
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

// setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath); // configure partials


// setup static directory to serve
app.use(express.static(publicDirectoryPath));




app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Andrew Mead'
    }); // allow us to render our views
    // no need for extension, file name just has to match with file name in views folder
});


app.get('/about',(req,res)=> {

    res.render('about',{
        title: 'About me',
        name: 'Andrew Mead'
    });

});


app.get('/help',(req,res) => {

    res.render('help',{
        message: 'Help message showing',
        title: 'Help',
        name: 'Andrew Mead'
    });

});


// this down will never run because express.static() will find the match so we can comment it
/*app.get('', (req, res) => { // this function describe what we wanna do when something want to visit this route
    // route is first argument in get() function
    // req - request, res - response
    res.send('<h1>Zdravo ljudi sa servera</h1>');
});*/

// new route help
/*app.get('/help',(req,res)=> {
    res.send({ // this will be automatically stringified
        name: 'Andrew',
        age: 27
    });
});

// about route
app.get('/about', (req,res) => {
    res.send('About page here');
});*/



// weather endpoint
app.get('/weather',(req,res)=> {

    // you cannot send responses back two times so we need to return here if it fails
    if(!req.query.address){
        return res.send({
            error: 'No address provided.You must provide address'
        });
    }


    geocode(req.query.address, (error,{latitude,longitude,placeName} = {}) => {
         
        if(error){
            return res.send({
                error
            });
        }

        forecast(latitude,longitude,(error,forecastData) => {

            if(error){
                return res.send({
                    error
                });
            }

            res.send({
                forecast: forecastData,
                placeName,
                address: req.query.address
            });

        });


    });



});

app.get('/products', (req,res) => {

    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        });
    }

    console.log(req.query.search);
    res.send({
        products: []
    });

});

app.get('/help/*',(req,res)=> {
    res.render('404',{
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found'
    });
});


// 404 page
app.get('*',(req,res) => {
    res.render('404',{
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found'
    });
});



// app.com -> one domain,this is also root route
// app.com/help -> second route
// app.com/about -> third route

// now we need to start server
app.listen(port, ()=> {
    // callback when server starts
    console.log('Server started correctly on port '+port);
}); // common development port