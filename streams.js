
const fs = require('fs');

const readStream = fs.createReadStream("./docs/bloq1.txt", { encoding: 'utf8' } )
const writeStream = fs.createWriteStream("./docs/bloq3.txt", { encoding: 'utf8'})



readStream.pipe(writeStream);