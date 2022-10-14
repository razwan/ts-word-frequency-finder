import { getOutput, getSortedWordFrequency } from "../utils";

test( 'given a string count the number of appearances of each word', () => {
    // arrange
    const data = 'to be or not to be';

    // act
    const wordFrequency = getSortedWordFrequency( data );

    // assert
    expect( wordFrequency.get( 'to' ) ).toBe( 2 );
    expect( wordFrequency.get( 'be' ) ).toBe( 2 );
    expect( wordFrequency.get( 'or' ) ).toBe( 1 );
    expect( wordFrequency.get( 'not' ) ).toBe( 1 );
} );

test( 'when counting appearances of a word ignore casing', () => {
    const data = 'camelcase cAmElcASe CamelCase CAMELCASE';
    const wordFrequency = getSortedWordFrequency( data );

    const expected = new Map( [['camelcase', 4]] );
    expect( [...wordFrequency.entries()] ).toEqual( [...expected.entries()] );
} );

test( 'when counting appearances of a word ignore punctuation', () => {
    // arrange
    const data = 'word, word,, word , ';

    // act
    const wordFrequency = getSortedWordFrequency( data );

    // assert
    const expected = new Map( [['word', 3]] );
    expect( [...wordFrequency.entries()] ).toEqual( [...expected.entries()] );
} );

test( 'whitespace does not affect counting words', () => {
    const data = `    word \nword    word   \t   word   `;
    const wordFrequency = getSortedWordFrequency( data );
    const expected = new Map( [['word', 4]] );
 
    expect( [...wordFrequency.entries()] ).toEqual( [...expected.entries()] );
} );

test( 'compound words are treated as a single word and counted properly', () => {
    const data = `don't remove my apostrophes`;
    const wordFrequency = getSortedWordFrequency( data );

    expect( wordFrequency .get( "don't" ) ).toBe( 1 );
} );

test( 'sorts in descending order a word frequency map instance', () => {
    const sortedFrequency = getSortedWordFrequency( 'two three three three two one' );
    const expected = new Map( [['three', 3], ['two', 2], ['one', 1]] );

    expect( [...sortedFrequency.entries()] ).toEqual( [...expected.entries()] );
} );

test( 'displays each word and stars as frequency on a separate row', () => {
    const sortedFrequency = getSortedWordFrequency( 'two three three three two one' );
    const output = getOutput( sortedFrequency );
    const expected = `three ***
two **
one *`;

    expect( output ).toBe( expected );
} );
