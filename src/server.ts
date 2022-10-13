import express from 'express';
import path from 'path';

import { getFileContents } from "./server/utils";
import { getSortedWordFrequency } from './utils';

const app = express();
const port = 3000;

app.use(express.static('dist'));

app.get( '/', async (req, res) => {
    res.sendFile(path.resolve(__dirname, '../index.html'));
} );

app.get( '/words', async (req, res) => {
    const contents = await getFileContents( './src/words.txt' );

    if ( contents === undefined ) {
        res.status(404).send();
        return;
    }

    const wordFrequency = getSortedWordFrequency( contents );
    
    res.type( 'application/json' );
    res.send( JSON.stringify( [...wordFrequency.entries()] ) );
} );

app.listen( port, () => {
    console.log(`App listening on port ${ port }`) 
} );
