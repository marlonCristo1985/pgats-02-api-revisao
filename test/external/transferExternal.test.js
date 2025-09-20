const request = require('supertest');
const { expect } = require('chai')

describe('Transfer External', () => {
    describe('POST /transfers', () => {
        it('Quando deixo de informar o remetente o retorno será 400 via HTTP', async () => {
            const resposta = await request('http://localhost:3001')
                .post('/api/transfers')
                .send({
                    remetente: "",
                    destinatario: "jamile",
                    valor: 600
                });

            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('message', 'Remetente, destinatario e valor são obrigatórios.');
        })
    })
})