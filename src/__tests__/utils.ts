import { getWordFrequency, sortWordFrequency } from "../utils";

// TDD time
test( 'properly counts appearances of a single word', () => {
    const data = 'a string with words of which some words repeat and some words do not';
    const wordFrequency = getWordFrequency( data );

    expect( wordFrequency.get( 'words' ) ).toBe( 3 );
} );

test( 'counts all instances of a word ignoring casing', () => {
    const data = 'camelcase cAmElcASe CamelCase CAMELCASE';
    const wordFrequency = getWordFrequency( data );

    expect( wordFrequency.get( 'camelcase' ) ).toBe( 4 );
} );


test( 'can ignore punctuation', () => {
    const data = 'word, word,, word , ';
    const wordFrequency = getWordFrequency( data );
 
    expect( wordFrequency.get( 'word' ) ).toBe( 3 );
} );

test( 'keeps apostrophes', () => {
    const data = `don't remove my apostrophes`;
    const wordFrequency = getWordFrequency( data );

    expect( wordFrequency .get( "don't" ) ).toBe( 1 );
} );

test( 'sorts in descending order a word frequency map instance', () => {
    const wordFrequency = new Map( [['two', 2], ['three', 3], ['one', 1]] );
    const sortedFrequency = sortWordFrequency( wordFrequency );
    const expected = new Map( [['three', 3], ['two', 2], ['one', 1]] );

    expect( [...sortedFrequency.entries()] ).toEqual( [...expected.entries()] )
} );