const countReducer = (accumulator: string, curVal: string) =>
    (Number(accumulator) + Number(curVal)).toString()

const sumScores = (data: string[]): string => {
    let sum = data.reduce(countReducer, '0')
    return sum
}

export { sumScores }
