const { Router } = require('express');
const { addExpense, getExpenses, deleteExpense, editExpense } = require('../controllers/gastos.controllers');

const router = Router();

router.get('/', getExpenses);
router.post('/', addExpense);
router.put('/', editExpense);
router.delete('/', deleteExpense);

module.exports = router;