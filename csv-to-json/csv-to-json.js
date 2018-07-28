const fs = require('fs');
const { Transform } = require('stream');
// const server = require('http').createServer();    
    
const csvToJson = (file, newName) => {
    const fileName = newName ? newName : `${file}.json`;
    let start = Date.now();

    const src = fs.createReadStream(file);
    
    const splitByNewline = new Transform({
        readableObjectMode: true,
        writableObjectMode: true,
    
        transform(chunk, encoding, callback){ 
            const rows = chunk.toString().split(/\r?\n|\r/g);
            const headers = rows[0].split(',');
            const ss = {
                headers,
                rows
            }
            this.push(ss);
            callback();
        }
    })
    
    const createRows = new Transform({
        readableObjectMode: true,
        writableObjectMode: true,
    
        transform(chunk, encoding, callback){
            const { headers, rows } = chunk;
            const data = {}
            for(let i = 1; i < rows.length; i++){
                data['row-' + i] = {};
                for(let j = 0; j < headers.length; j++){
                    let cols = rows[i].split(',')
                    let currentHeader = headers[j];
                    let currentData = cols[j];
                    data['row-' + i][currentHeader] = currentData;
                }
            }
            this.push(data)
            callback()
        }
    })
    
    const objToString = new Transform({
        writableObjectMode: true,
    
        transform(chunk, encoding, callback){
            this.push(JSON.stringify(chunk))
            callback();
        }
    })
    
    const csvFile = fs.createWriteStream(fileName + '.json');
    
    src
        .pipe(splitByNewline)
        // .pipe(createRows)
        .pipe(createRows)
        .pipe(objToString)
        .pipe(csvFile)
        .on('finish', () => {
            console.log('\nTime to complete: ' + (Date.now() - start) + 'ms\n' ) ;
        })
}

module.exports = csvToJson;