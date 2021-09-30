const { v4 } = require('uuid');
const { response, request } = require('express');

const Gasto = require('../models/gasto.js');
const { addGastoRoommate, deleteGastoRoommate } = require('./roommates.controllers.js');

const gasto = new Gasto(v4, 'gastos');

const addExpense = ( req = request, res = response ) => {
    const { roommate, descripcion, monto } = req.body;
    const nuevoGasto = gasto.newExpense( roommate, descripcion, monto);
    gasto.addNewItem( nuevoGasto );
    addGastoRoommate( roommate, monto )
    res.json({
        msg: `Gasto ingresado por ${ roommate } se ha grabado con exito`
    })
};

const getExpenses = ( req = request, res = response ) => {
    const gastos = { gastos: gasto.dataBackup };
    res.json( gastos );
};

const editExpense = ( req = request, res = response ) => {
    const { id } = req.query;
    const { roommate: removeRoommate, monto: removeMonto } = gasto.array.find( gasto => gasto.id === id );
    deleteGastoRoommate(removeRoommate, removeMonto);
    const { roommate, descripcion, monto } = req.body;
    gasto.array.splice(gasto.array.findIndex( gasto => gasto.id === id), 1, {
        id,
        roommate,
        descripcion,
        monto
    });
    addGastoRoommate(roommate, monto);
    gasto.grabarBackup();
    res.json({ msg: 'Gasto editado con exito' })
};

const deleteExpense = ( req = request, res = response ) => {
    const { id } = req.query;
    const { roommate, monto } = gasto.array.find( gasto => gasto.id === id );
    deleteGastoRoommate(roommate, monto);
    gasto.array.splice(gasto.array.findIndex( gasto => gasto.id === id), 1);
    gasto.grabarBackup();
    res.json({ msg: 'Gasto eliminado con exito' });
};

module.exports = {
    addExpense,
    getExpenses,
    editExpense,
    deleteExpense,
}