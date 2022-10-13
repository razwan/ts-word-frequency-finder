import { getFileContents } from "./server/utils";
import { getSortedWordFrequency, getOutput } from "./utils";

(async () => {
    const contents = await getFileContents( './src/words.txt' );

    if ( contents ) {
        const wordFrequency = getSortedWordFrequency( contents );
        const output = getOutput( wordFrequency );

        console.log( output );
    }
})();
