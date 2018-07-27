const express = require('express');
const bodyParser = require('body-parser');
const path = ('path');



const app = express();

app.get('/', (req, res) => {
    res.send('hello')
})

app.post('/csv-to-json', (req, res) => {
    console.log(req.body)
})

app.listen(process.env.PORT || 3000, () => {
    console.log('server listening on ' + 3000);
})