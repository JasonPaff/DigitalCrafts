function caesarShift (str, amount) {
    let shiftedStr = "";

    for (let i=0; i<str.length; i++){                
        let shiftedChar = ''
        const code = str.charCodeAt(i)
        
        if (code >= 65 && code <= 90) 
            shiftedChar = String.fromCharCode(((code - 65 + amount) % 26) + 65)
        else if (code >= 97 && code <= 122) 
            shiftedChar = String.fromCharCode(((code - 97 + amount) % 26) + 97)
        else if (code == 32) 
            shiftedChar = ' '

        shiftedStr += shiftedChar
    }

    return shiftedStr
}

let result = caesarShift('I love boo', 4)
console.log(result)