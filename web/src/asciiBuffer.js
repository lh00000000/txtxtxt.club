const buffer = (text, color) => text
    .split("\n")
    .map(line => line.split("").map(char => ({
        color,
        char
    })))

const isBlank = cell => (_.isUndefined(cell) || cell.char === ' ')

const combine = (bottom, top, method) => _
    .zip(bottom, top)
    .map(([bottomRow, topRow]) => 
        _.zip(
            _.defaultTo(bottomRow, []), 
            _.defaultTo(topRow, [])
        ).map(method))

const add = (bottom, top) => 
    combine(
        bottom, 
        top, 
        ([bottomCell, topCell]) => 
            isBlank(topCell) ? _.defaultTo(bottomCell, { char: ' ' }) : topCell
    )

const subtract = (bottom, whereToErase) => 
    combine(
        bottom, 
        whereToErase, 
        ([bottomCell, shouldErase]) => 
            isBlank(shouldErase) ? bottomCell : { char: ' ' }
    )

const left = (buffer, amount) => 
    buffer.map(
        row => 
            _.concat(
                _.range(amount).map(x => ({ char: ' ' })), 
                row
            )
        )

const top = (buffer, amount) => _.concat(_.range(amount), buffer)

const translate = (buffer, x, y) => top(left(buffer, x), y)


export default {
    add,
    subtract,
    translate,
    buffer
}