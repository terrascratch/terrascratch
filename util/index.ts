import { BIG_TEXT_BREAK_POINT } from "./constants"

function breakLine(str: string) {
    const strLength = str.length
    let newStrArr = []
    for (let i = 0; i < strLength; i += BIG_TEXT_BREAK_POINT) {
        newStrArr.push(str.slice(i, i + BIG_TEXT_BREAK_POINT))
    }

    return newStrArr.join('\n')
}

export {
    breakLine
}
