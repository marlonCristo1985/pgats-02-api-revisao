const request = require('supertest');
const { expect } = require('chai')

describe('Transfer External', () => {
    describe('POST /transfers', () => {
        it('Quando deixo de informar o remetente o retorno será 400 via HTTP', async () => {
            const respostaLogin = await request ('http://localhost:3001')
                .post('/api/users/login')
                .send({
                    username: "marlon",
                    password: "12345"
                });

            const token = respostaLogin.body.token

            const resposta = await request('http://localhost:3001')
                .post('/api/transfers')
                .set('Authorization', `Bearer ${token}` )
                .send({
                    remetente: "marlon",
                    destinatario: "jamile",
                    valor: 600
                });

            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('message', 'Remetente, destinatario e valor são obrigatórios.');
        })
    })
})