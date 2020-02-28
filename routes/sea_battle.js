const {Router} = require('express')
const mongoose = require('mongoose')

const Cells = require('../models/Battlefield')
const Ship = require('../models/Ship')
const Player = require('../models/Player')

const createBattleField = require('../battle_field')

const router = Router();


router.get('/newgame', async (req, res) => {

    await mongoose.connection.db.dropCollection( "ships", function(err, result) {
        console.log("Collection droped")
    })
    await mongoose.connection.db.dropCollection( "cells", function(err, result) {
        console.log("Collection droped")
    })
    let player = await Player.find().sort({name: -1})
    player = player[0]
    player.shipsDestroyedNum = 0
    createBattleField()
    let mesgs = [, ] 
    player.messages.push('User requested new game')
    player.messages.push('New game started')
    await player.save()
    res.render( 'fire', { 
        title: 'Fire, please...',
        messages: player.messages.reverse() } )
})

router.get('/', async (req, res) =>{
    res.render('index', {
        title: 'Hello...',      
    })
})


router.get('/play', async (req, res) =>{
    
    let lastPlayer = await Player.find().sort({name: -1})

    lastPlayer = lastPlayer[0].name + 1
    let player = new Player ({
        _id: new mongoose.Types.ObjectId(),
        name: lastPlayer,
        shipsTotalNum: 3,
        shipsDestroyedNum: 0
    })
    await mongoose.connection.db.dropCollection( "ships", function(err, result) {
        console.log("Collection droped")
    })
    await mongoose.connection.db.dropCollection( "cells", function(err, result) {
        console.log("Collection droped")
    })    
    createBattleField();
    player.messages.push('New game started')
    await player.save() 
    res.render('fire', {
        title: 'Fire, please...',
        messages: player.messages.reverse()
    })
})


router.post('/seabattle', async (req, res) => {
    let message = ""
    const query = {
        xcord: req.body.x,
        ycord: req.body.y
    }
    let player = await Player.find().sort({name: -1})
    player = player[0]
    let target = await Cells.findOne(query)
  
    if (target.shooted) {
        message = 'You\'ve already shooted here.'
        player.messages.push(message)
    } else if (!target.occupied) {
        message = 'You\'ve missed.'
        player.messages.push(message)
    } else if (target.occupied) {
        const attackedShip = await Ship.findOne({ _id: target.occupiedBy })
        attackedShip.damaged++
        await attackedShip.save();
        if (attackedShip.damaged === attackedShip.length){
            player.shipsDestroyedNum++
            if(player.shipsDestroyedNum === player.shipsTotalNum){ 
                message = 'GAME OVER. You won the game' 
                player.messages.push(message)
            }
            else{
                attackedShip.destroyed = true;
                message = "WOW! You've destroed " + attackedShip.name 
                player.messages.push(message)
                await attackedShip.save();      
            } 
        }
        else{
            message = "Hey, you've damaged " + attackedShip.name
            player.messages.push(message)
        } 
    }
  
    target.shooted = true;
    await target.save();
    await player.save();
 
    res.render('fire', {
        title: 'Fire, please...',
        messages: player.messages.reverse()
    })
})

module.exports = router