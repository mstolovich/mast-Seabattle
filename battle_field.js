const mongoose = require('mongoose')
const Cell = require('./models/Battlefield')
const Ship = require('./models/Ship')


async function createBattleField() {
    const ships = await createShips()
    for (let y = 0; y <= 9; y++) {
        for (let x = 0; x <= 9; x++){
            const cell = new Cell({
                    _id: new mongoose.Types.ObjectId(),
                    xcord: x,
                    ycord: y
                })
            await cell.save()
        }
    }
    
    let c1_5 = await Cell.findOne({xcord: 1, ycord: 5})
    c1_5.occupied = true
    c1_5.occupiedBy = ships[0]._id 
    await c1_5.save()
    
    let c2_9 = await Cell.findOne({xcord: 2, ycord: 9})
    c2_9.occupied = true
    c2_9.occupiedBy = ships[1]._id
    await c2_9.save()

    let c3_9 = await Cell.findOne({xcord: 3, ycord: 9})
    c3_9.occupied = true
    c3_9.occupiedBy = ships[1]._id
    await c3_9.save()

    let c2_0 = await Cell.findOne({xcord: 2, ycord: 0})
    c2_0.occupied = true
    c2_0.occupiedBy = ships[2]._id
    await c2_0.save()

    let c3_0 = await Cell.findOne({xcord: 3, ycord: 0})
    c3_0.occupied = true
    c3_0.occupiedBy = ships[2]._id
    await c3_0.save() 

    let c4_0 = await Cell.findOne({xcord: 4, ycord: 0})
    c4_0.occupied = true
    c4_0.occupiedBy = ships[2]._id
    await c4_0.save()

}   



async function createShips(){
    const ships = []

    const patrolBoat1 = new Ship({
        _id: new mongoose.Types.ObjectId(),
        name: 'PatrolBoat1',
        length: 1
    })
    await patrolBoat1.save()
    ships.push(patrolBoat1)

    const destroyer1 = new Ship({
        _id: new mongoose.Types.ObjectId(),
        name: 'Destroyer1',
        length: 2
    })
    await destroyer1.save()
    ships.push(destroyer1)
    
    const cruiser = new Ship({
        _id: new mongoose.Types.ObjectId(),
        name: 'Cruiser1',
        length: 3
    })
    await cruiser.save()
    ships.push(destroyer1)

    const battleship = new Ship({
        _id: new mongoose.Types.ObjectId(),
        name: 'Battleship1',
        length: 4
    })
    await battleship.save()
    ships.push(destroyer1)

    return ships
}
    
    

module.exports = createBattleField;
