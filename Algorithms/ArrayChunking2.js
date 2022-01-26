function chunk(arr, size, position){
    let chunks = []

    while (arr.length > 0)
    {
        let chunk = arr.splice(0, size)
        chunks.push(chunk)
    }

    return chunks[position - 1]
}

let arr = [8,93,532,42,1,2]

console.log(arr) // [ 8, 93, 532, 42, 1, 2 ]

let result = chunk(arr, 3, 2)

console.log(result) // [ 42, 1, 2 ]