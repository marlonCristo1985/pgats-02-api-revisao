
const { transfers } = require('../model/transferModel');
const { users } = require('../model/userModel');

exports.createTransfer = (remetente, destinatario, valor) => {
  if (!remetente || !destinatario || typeof valor !== 'number') {
    return { status: 400, message: 'Remetente, destinatario e valor são obrigatórios.' };
  }
  const userFrom = users.find(u => u.username === remetente);
  const userTo = users.find(u => u.username === destinatario);
  if (!userFrom || !userTo) {
    return { status: 404, message: 'Usuário remetente ou destinatário não encontrado.' };
  }
  if (userFrom.saldo < valor) {
    return { status: 400, message: 'Saldo insuficiente.' };
  }
  const isFavorecido = userFrom.favorecidos.includes(destinatario);
  if (!isFavorecido && valor >= 5000) {
    return { status: 403, message: 'Transferências acima de R$ 5.000,00 só podem ser feitas para favorecidos.' };
  }
  userFrom.saldo -= valor;
  userTo.saldo += valor;
  const transfer = { remetente, destinatario, valor, data: new Date().toISOString() };
  transfers.push(transfer);
  return { status: 200, message: 'Transferência realizada com sucesso.', transfer };
};

exports.getAllTransfers = (req, res) => {
  res.json(transfers);
};
