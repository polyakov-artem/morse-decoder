const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
};

const DOT_VALUE = '10';
const DASH_VALUE = '11';
const SPACE_VALUE = '**********';
const ENCODED_KEY_LENGTH = 10;
const ENCODED_EMPTY_KEY_PATTERN = '0'.repeat(ENCODED_KEY_LENGTH);

const decodeObj ={};


function encodeMorseTable(){
    for (let key in MORSE_TABLE) {
        let encodedKey = key.replace(/\./g, DOT_VALUE).replace(/\-/g, DASH_VALUE);

        if (ENCODED_KEY_LENGTH > encodedKey.length) {
            const sizeDiff = ENCODED_KEY_LENGTH - encodedKey.length;
            encodedKey = ENCODED_EMPTY_KEY_PATTERN.slice(0, sizeDiff) + encodedKey;
        };

        decodeObj[encodedKey] = MORSE_TABLE[key]
    };
}

encodeMorseTable();

function decode(expr) {
    const splittedEncodedArr = expr.split(SPACE_VALUE);
    const splittedDecodedArr = [];

    for (let i = 0; i<splittedEncodedArr.length; i++){
        const decodedSequence = decodeSequnce(splittedEncodedArr[i]);
        if (!decodedSequence) continue;
        splittedDecodedArr.push(decodedSequence);
    };

    return splittedDecodedArr.join(' ');
}


function decodeSequnce(signSequence){
    const numOfSigns = signSequence.length/ENCODED_KEY_LENGTH;
    const decodedSequenceArr = [];
    
    let sliceStart = 0;
    
    for (let i=0; i< numOfSigns; i++){
        const encodedSign = signSequence.substr(sliceStart, ENCODED_KEY_LENGTH);
        const decodedSign = decodeObj[encodedSign];
        decodedSequenceArr.push(decodedSign);
        sliceStart = sliceStart + ENCODED_KEY_LENGTH;
    };

    return decodedSequenceArr.join('')
};


module.exports = {
    decode
}