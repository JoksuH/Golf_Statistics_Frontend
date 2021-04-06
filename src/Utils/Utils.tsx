import { gql, useMutation } from '@apollo/client'
import  React from 'react'


const CREATE_ROUND = gql`
    mutation roundCreateOnenew(
        $coursename: MongoID!
        $holescores: [String]!
        $putts: [String]!
        $fir: [String]!
        $gir: [String]!
        $approachdistance: [String]!
        $penalties: [String]!
        $greenbunkers: [String]!
        $fwbunkers: [String]!
    ) {
        roundCreateOne(
            record: {
                coursename: $coursename
                holescores: $holescores
                putts: $putts
                fir: $fir
                gir: $gir
                approachdistance: $approachdistance
                penalties: $penalties
                greenbunkers: $greenbunkers
                fwbunkers: $fwbunkers
            }
        ) {
            recordId
        }
    }
`

const DataFaker: React.FC = () => {

const fakePars: number[] = [5, 3, 4, 4, 5, 4, 4, 3, 5, 4, 4, 3, 5, 3, 4, 4, 4, 5]


let SelectedCourseID: string = "6059ec67ed6e8f279ce59863"
let ScoreCard: string[] = createFakeScoreData(fakePars)
let Putts: string[] = createFakePuttData()
let FIR: string[] = createFakeFIRData(fakePars)
let GIR: string[] = createFakeGIRData()
let ApproachDistance: string[] = createFakeApproachData(GIR)
let Penalties: string[] = createFakeSmallNumData()
let FairwayBunkers: string[] = createFakeSmallNumData()
let GreenBunkers: string[] = createFakeSmallNumData()

let [addRound,] = useMutation(CREATE_ROUND)

addRound({
        variables: {
            coursename: SelectedCourseID,
            holescores: ScoreCard,
            putts: Putts,
            fir: FIR,
            gir: GIR,
            approachdistance: ApproachDistance,
            penalties: Penalties,
            greenbunkers: GreenBunkers,
            fwbunkers: FairwayBunkers,
        

}})

return(<div></div>)

}

const createFakeScoreData = (fakePars: number[]): string[] => {

    let fakeData: string[] = []


    for (let i = 0; i < 18; i++) {

        const posvalues: number[] = [fakePars[i]-2, fakePars[i]-1, fakePars[i]-1, fakePars[i]-1, fakePars[i]-1, fakePars[i],fakePars[i],fakePars[i],fakePars[i],fakePars[i],fakePars[i],fakePars[i],fakePars[i],fakePars[i],fakePars[i],fakePars[i],fakePars[i],fakePars[i],fakePars[i],fakePars[i],fakePars[i],fakePars[i],fakePars[i],fakePars[i],fakePars[i],fakePars[i],fakePars[i],fakePars[i] +1,fakePars[i] +1,fakePars[i] +1,fakePars[i] +1,fakePars[i] +1,fakePars[i] +1,fakePars[i] +1,fakePars[i] +1,fakePars[i] +1,fakePars[i] +1,fakePars[i] +1,fakePars[i] +2,fakePars[i] +2,fakePars[i] +2,fakePars[i] +2 ]

        let randomval: number = Math.floor(Math.random() * (posvalues.length -1  + 1))

        fakeData.push(posvalues[randomval].toString())

    }

    return fakeData

}

const createFakeSmallNumData = (): string[] => {

    const numValues: string[] = ["0","0","0","0","0","1","1","2"]

    let fakeData: string[] = []

    for (let i = 0; i < 18; i++) {

        let randomval: number = Math.floor(Math.random() * (numValues.length -1  + 1))

        fakeData.push(numValues[randomval])

    }

    return fakeData

}
const createFakePuttData = (): string[] => {

    const numValues: string[] = ["2","2","2","2","2","1","1","3"]

    let fakeData: string[] = []

    for (let i = 0; i < 18; i++) {

        let randomval: number = Math.floor(Math.random() * (numValues.length -1  + 1))

        fakeData.push(numValues[randomval])

    }

    return fakeData

}

const createFakeGIRData = (): string[] => {

    const posValues = ["hit","hit","hit","hit","hit","hit","hit","hit","hit","hit","hit","hit","left", "right", "long", "short", "NONE", "right long", "right short", "left short", "left long"]

    let fakeData: string[] = []

    for (let i = 0; i < 18; i++) {

        let randomval: number = Math.floor(Math.random() * (posValues.length-1  + 1))

        fakeData.push(posValues[randomval])

    }

    return fakeData

}

const createFakeFIRData = (fakePars: number[]): string[] => {

    const posValues = ["hit","hit","hit","left", "left", "right"]

    let fakeData: string[] = []

    for (let i = 0; i < 18; i++) {

        let randomval: number = Math.floor(Math.random() * (posValues.length-1  + 1))
        
        if (fakePars[i] !== 3)
             fakeData.push(posValues[randomval])
            else fakeData.push("NONE")


    }

    return fakeData

}

const createFakeApproachData = (girData: string[]): string[] => {

    let fakeData: string[] = []

    for (let i = 0; i < 18; i++) {

        if (girData[i] !== "NONE") {

        let randomval: string = Math.floor(Math.random() * (200 -1  + 1) + 10).toString()

        fakeData.push(randomval)
    }
    else fakeData.push("NONE")

    }

    return fakeData

}

export {DataFaker}
