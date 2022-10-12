const removePunctuation: ( original: string ) => string = ( original ) => {
    const stripped = original.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    return stripped;
}

export const getWordFrequency: ( data: string ) => Map<string, number> = ( data ) => {
    const wordFrequency: Map<string, number> = new Map();
    const words = data.trim().split(/\s+/).map( removePunctuation );

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

export const sortWordFrequency: ( original: Map<string, number> ) => Map<string, number> = ( original ) => {
    return new Map( [ ...original.entries() ].sort( ( a, b ) => {
        return b[1] - a[1];
    } ) );
}

export const getSortedWordFrequency: ( data: string ) => Map<string, number> = ( data ) => {
    const wordFrequency = getWordFrequency( data );
    return sortWordFrequency( wordFrequency );
}

export const getOutput: ( wordFrequency: Map<string, number> ) => string = ( wordFrequency ) => {
    return [...wordFrequency.entries()].reduce( ( acc, curr ) => {
        const word = curr[0];
        const frequency = curr[1];
        const stars = Array( frequency ).fill('*').join('');
        const currentEntryOutput = `${ word } ${ stars }`;
        return `${ acc } ${ currentEntryOutput } \n`
    }, '' )
}