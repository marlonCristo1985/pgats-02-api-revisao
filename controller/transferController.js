const express = require('express');
const router = express.Router();
const transferService = require('../service/transferService');
const authenticateToken = require('../middleware/authenticateToken');


// Todas as rotas de transferências exigem autenticação
router.post('/', authenticateToken, (req, res) => {
	const { remetente, destinatario, valor } = req.body;
	const result = transferService.createTransfer(remetente, destinatario, valor);
	if (result.status !== 200) {
		return res.status(result.status).json({ message: result.message });
	}
	res.json({ message: result.message, transfer: result.transfer });
});

router.get('/', authenticateToken, transferService.getAllTransfers);

module.exports = router;
