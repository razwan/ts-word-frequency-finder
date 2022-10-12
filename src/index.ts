import fs from "fs/promises";

import { getSortedWordFrequency, getOutput } from "./utils";

const getFileContents: () => Promise<string | undefined> = async () => {
    try {
        return await fs.readFile( './src/words.txt', { encoding: 'utf8' });
    } catch (err) {
        console.log(err);
    }
}

(async () => {
    const contents = await getFileContents();

    if ( contents ) {
        const wordFrequency = getSortedWordFrequency( contents );
        const output = getOutput( wordFrequency );
        console.log( output );
    }
})();
