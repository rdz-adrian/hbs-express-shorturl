const express = require('express')

const app = express();
const port = process.env.PORT || 5000

//-----------view engine--------------
const { create } = require('express-handlebars');
const hbs = create({
    extname: 'hbs',
    partialsDir: ['views/components']
})
app.engine('.hbs', hbs.engine)
app.set('view engine', '.hbs');
app.set("views", __dirname + "/views");
//----------end view engine-------------

//middlewares
app.use(express.urlencoded({extended:true}))
app.use('/', require('./routes/home.routes'))
app.use('/auth', require('./routes/auth.routes'))
    
app.listen(port, () => console.log('Server on port  ' + port))