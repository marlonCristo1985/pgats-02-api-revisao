const express = require('express');
const router = express.Router();
const transferService = require('../service/transferService');

// POST /api/transfers
router.post('/', (req, res) => {
	const { remetente, destinatario, valor } = req.body;
	const result = transferService.createTransfer(remetente, destinatario, valor);
	if (result.status !== 200) {
		return res.status(result.status).json({ message: result.message });
	}
	res.json({ message: result.message, transfer: result.transfer });
});

router.get('/', transferService.getAllTransfers);

module.exports = router;
