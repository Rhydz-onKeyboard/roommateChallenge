const { v4 } = require('uuid');
const { response, request } = require('express');

const Gasto = require('../models/gasto.js');
const { addGastoRoommate, deleteGastoRoommate } = require('./roommates.controllers.js');

const gasto = new Gasto(v4, 'gastos');

const addExpense = ( req = request, res = response, next ) => {
    try {
        const { roommate, descripcion, monto } = req.body;
        const nuevoGasto = gasto.newExpense( roommate, descripcion, monto);
        gasto.addNewItem( nuevoGasto );
        addGastoRoommate( roommate, monto )
        res.status(200).json({
            msg: `Gasto ingresado por ${ roommate } se ha grabado con exito`
        });
    } catch (err) {
        next(err);
    };
};

const getExpenses = ( req = request, res = response, next ) => {
    try {
        const gastos = { gastos: gasto.dataBackup };
        res.status(200).json( gastos );
    } catch (err) {
        next(err);
    };
};

const editExpense = ( req = request, res = response, next ) => {
    try {
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
        res.status(200).json({ msg: 'Gasto editado con exito' });
    } catch (err) {
        next(err);
    };
};

const deleteExpense = ( req = request, res = response, next ) => {
    try {
        const { id } = req.query;
        const { roommate, monto } = gasto.array.find( gasto => gasto.id === id );
        deleteGastoRoommate(roommate, monto);
        gasto.array.splice(gasto.array.findIndex( gasto => gasto.id === id), 1);
        gasto.grabarBackup();
        res.status(200).json({ msg: 'Gasto eliminado con exito' });
        //throw new Error('There was an error deleting the expense');
    } catch (err) {
        next(err);
    };
};

module.exports = {
    addExpense,
    getExpenses,
    editExpense,
    deleteExpense,
}