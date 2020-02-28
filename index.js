const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');

const appRoutes = require('./routes/sea_battle');
//const createBattleField = require('./battle_field')

const PORT = 3000;

const app = express();
const hbs = exphbs.create({
   defaultLayout: 'main',
   extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));

app.use(appRoutes);

async function start() {
   try{
      await mongoose.connect('mongodb+srv://sbdb:Scrapy85@seabattle-w5hlc.mongodb.net/battlefield', {
         useNewUrlParser: true, 
         useFindAndModify: false
      });
      app.listen(PORT, () => {
         console.log('Server has been started...');
      });
   } catch (e) {
      console.log(e);
   }
}

start();