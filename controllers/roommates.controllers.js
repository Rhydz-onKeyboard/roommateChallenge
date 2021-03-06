const { v4 } = require('uuid');
const axios = require('axios');
const { response, request } = require('express');
const Roommate = require('../models/roommate.js');

const roommate = new Roommate(v4, 'roommates', axios);

const addRoommate = async ( req = request, res = response, next ) => {
    try {
        const newRoommate = await roommate.newRoommate();
        roommate.addNewItem( newRoommate );
        res.json({
            msg: 'Roommate creado con exito'
        });
    } catch (err) {
        next(err);
    };
};

const getRoommates = ( req = request, res = response, next ) => {
    try {
        const roommates = { roommates: roommate.dataBackup };
        res.json(roommates);
    } catch (err) {
        next(err)
    }
};

const addGastoRoommate = ( roommateParam, monto ) => {
    const roommates = roommate.dataBackup;
    const division = monto/roommates.length
    roommates.map( e => {
        e.nombre === roommateParam ? e.recibe += (monto - division) : e.debe += division;
    })
    roommate.grabarBackup()
};

const deleteGastoRoommate = (roommateParam, monto) => {
    const roommates = roommate.dataBackup;
    const division = monto/roommates.length
    roommates.map( e => {
        e.nombre === roommateParam ? e.recibe -= (monto - division) : e.debe -= division;
    })
    roommate.grabarBackup()
};

module.exports = {
    addRoommate,
    getRoommates,
    addGastoRoommate,
    deleteGastoRoommate,
};
