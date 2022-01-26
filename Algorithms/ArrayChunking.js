function chunk(arr, size){
    let chunks = []

    while (arr.length > 0)
    {
        let chunk = arr.splice(0, size)
        chunks.push(chunk)
    }

    return chunks
}

let arr = [8,9,2,435,42]

console.log(arr) // [ 8, 9, 2, 435, 42 ]

let result = chunk(arr, 2)

console.log(result) // [ [ 8, 9 ], [ 2, 435 ], [ 42 ] ]