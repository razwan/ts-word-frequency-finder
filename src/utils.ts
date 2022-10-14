export const getSortedWordsFrequencies: ( data: string ) => Map<string, number> = ( data ) => {
    const wordFrequency = getWordsFrequencies( data );
    return sortWordsFrequencies( wordFrequency );
}

export const getOutput: ( wordFrequency: Map<string, number> ) => string = ( wordFrequency ) => {
    const rows = [...wordFrequency.entries()].reduce( ( acc: Array<string>, curr ) => {
        const word = curr[0];
        const frequency = curr[1];
        const stars = Array( frequency ).fill('*').join('');
        const currentEntryOutput = `${ word } ${ stars }`;
        acc.push( currentEntryOutput );
        return acc;
    }, [] );
    return rows.join('\n');
}

const getWordsFrequencies: ( data: string ) => Map<string, number> = ( data ) => {
    const wordFrequency: Map<string, number> = new Map();
    const words = data.match(/[^\s.,\/#!$%\^&\*;:{}=\-_`~()]+/g) ?? [];

    words.forEach( word => {
        const key = word.toLowerCase();
        if ( wordFrequency.has( key ) ) {
            wordFrequency.set( key, wordFrequency.get( key )! + 1 );
        } else {
            wordFrequency.set( key, 1 );
        }
    } )

    return wordFrequency;
}

const sortWordsFrequencies: ( original: Map<string, number> ) => Map<string, number> = ( original ) => {
    return new Map( [ ...original.entries() ].sort( ( a, b ) => {
        return b[1] - a[1];
    } ) );
}
