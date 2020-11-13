// Importeren Core module fs
const fs = require('fs');
// of via ES6 syntax:
// import { writeFile, readFile, mkdir } from 'fs';
const schrijvenEnLezen = () => {
    // Aanmaken van nieuw directory om bestanden in op te slaan
    if(!fs.existsSync('./files')){
        fs.mkdir('./files', err => {
            if (err) {
                console.log(err);
            }
            else {
                console.log(`New directory 'files' has been succesfully created.`);
            }
        });
    }
    // Asynchroon wegschrijven van .txt bestand
    fs.writeFile('./files/Naam.txt', 'Frederik De Brouwer', err => {
        if (err) {
            console.log(err);
        }
        else{
            console.log('Write operation succesfully completed.');
        }
    });
    /* Asynchroon lezen van .txt bestand
    * options parameter 'utf-8' specifieert de encoding van buffer data
    */
    fs.readFile('./files/Naam.txt', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(data);
        }
    });
}
// module exporteren naar global object
module.exports = schrijvenEnLezen;
// Of via ES6:
// export default schrijvenEnLezen;