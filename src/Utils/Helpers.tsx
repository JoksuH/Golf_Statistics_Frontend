const countReducer = (accumulator: string, curVal: string) =>
    (Number(accumulator) + Number(curVal)).toString()

const sumScores = (data: string[]): string => {
    let sum = data.reduce(countReducer, '0')
    return sum
}

const hitCounter = (arr: string[], hitvalue: string): string => {
    let count = 0

    arr.forEach((element) => {
        if (element === hitvalue) count += 1
    })

    return count.toString()
}


export { sumScores, hitCounter }
