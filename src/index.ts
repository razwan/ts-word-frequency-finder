import { getFileContents } from "./server/utils";
import { getSortedWordsFrequencies, getOutput } from "./utils";

const performanceMeasurement = ( contents: string ) => {
    const startTotal = performance.now();
    const iterations = 1000;
    let maxTime = 0;
    let minTime = Number.MAX_SAFE_INTEGER;
    
    Array(iterations).fill(null).forEach( () => {
        const start = performance.now();
        getSortedWordsFrequencies( contents );
        const end = performance.now();
        maxTime = Math.max( end - start, maxTime );
        minTime = Math.min( end - start, minTime );
    } );

    const endTotal = performance.now();

    console.log( `Total time was: ${ endTotal - startTotal }ms` );
    console.log( `Average time was: ${ ( endTotal - startTotal ) / iterations }ms` );
    console.log( `Max time was: ${ maxTime }ms` );
    console.log( `Min time was: ${ minTime }ms` );
}

(async () => {
    const contents = await getFileContents( './src/words.txt' );

    if ( contents ) {
        const wordFrequency = getSortedWordsFrequencies( contents );
        const output = getOutput( wordFrequency );

        console.log( output );

        // performanceMeasurement( contents );

        // average time before tweaks:  3.644ms
        // average time after tweaks:   2.743ms -> 75.27%
    }
})();
