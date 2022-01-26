function caesarUnshift (str, range) {
    let shiftedStrs = []
for (let c=range[0]; c<=range[1]; c++)
{
    let shiftedStr = ""

    for (let i=0; i<str.length; i++){        
        if (str[i].match(/[a-z]/i) == false) continue

        const code = str.charCodeAt(i)

        let shiftedChar = ''
        
        if (code >= 65 && code <= 90) shiftedChar = String.fromCharCode(((code - 65 - c) % 26) + 65)
        else if (code >= 97 && code <= 122) shiftedChar = String.fromCharCode(((code - 97 - c) % 26) + 97)
        else if (code == 32) shiftedChar = ' '

        shiftedStr += shiftedChar
    }

    if (shiftedStr.includes("boo")) return shiftedStr

    shiftedStrs.push(shiftedStr)
}
    return shiftedStrs
}

let result = caesarUnshift("M pszi fss", [2,6])
let result2 = caesarUnshift("M pszi fii", [2,6])

console.log(result) 
console.log(result2)