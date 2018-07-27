const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// middleware
app.use(bodyParser.urlencoded( {extended: true } ))
app.use(express.static('public'))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})

app.post('/csv-to-json', (req, res) => {
    console.log(req.body)
    res.sendFile(__dirname, )
})

app.listen(process.env.PORT || 3000, () => {
    console.log('server listening on ' + 3000);
})