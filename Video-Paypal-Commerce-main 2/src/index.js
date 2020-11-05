const express = require("express");
const path = require('path')
const app = express();
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 5000;

// app.get("/checkout", async (req, res) => {
//   // express.static('./static/checkout.html')
// });

// app.get('/checkout/completed', async (req, res) => {

// })


const routingMw = ( req, res, next ) => {
    const pathP =  req.params.path
    next()
};


// app.use('/:path', routingMw())

app.use('/', express.static(path.join( __dirname, '/static' )) )
// app.use ('/checkout', ( express.static(path.join( __dirname, '/static/checkout' )))) 

app.get('/', (req, res) => {
    
})

app.get('/checkout', (req, res) => {
    res.sendFile(path.join(__dirname, './static/checkout.html'))
})


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
