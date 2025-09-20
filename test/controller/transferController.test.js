const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai')

const app = require('../../app')

const transferService = require('../../service/transferService');


describe('Transfer Controller', () => {
    describe('POST /transfers', () => {
        it('Quando deixo de informar o remetente o retorno será 400', async () => {
            const resposta = await request(app)
                .post('/api/transfers')
                .send({
                    remetente: "",
                    destinatario: "jamile",
                    valor: 600
                });

            expect(resposta.status).to.equal(400)
            expect(resposta.body).to.have.property('message', 'Remetente, destinatario e valor são obrigatórios.')
        })

        it('Usando mocks: Quando deixo de informar o remetente o retorno será 400', async () => {
            // Mocar apenas a função transfer do service

            const transferServiceMock = sinon.stub(transferService, 'createTransfer')
            //transferServiceMock.throws(new Error ('Remetente, destinatario e valor são obrigatórios.'))
            transferServiceMock.returns({
                status: 400,
                message: 'Remetente, destinatario e valor são obrigatórios.'
            })

            const resposta = await request(app)
                .post('/api/transfers')
                .send({
                    remetente: "",
                    destinatario: "jamile",
                    valor: 600
                });

            expect(resposta.status).to.equal(400)
            expect(resposta.body).to.have.property('message', 'Remetente, destinatario e valor são obrigatórios.')

            //Reset do mock
            sinon.restore();
        })

        it.only('Usando mocks: Quando informo valores válidos eu tenho sucesso com 200 CREATED', async () => {
            // Mocar apenas a função transfer do service

            const transferServiceMock = sinon.stub(transferService, 'createTransfer')
            transferServiceMock.returns({
                status: 200,
                message: 'Transferência realizada com sucesso.',
                transfer: {
                    remetente: 'marlon',
                    destinatario: 'jamile',
                    valor: 1500,
                        data: new Date().toISOString()
                    }
                })

            const resposta = await request(app)
                .post('/api/transfers')
                .send({
                    remetente: "marlon",
                    destinatario: "jamile",
                    valor: 1500
                });
                console.log(resposta.body)

            expect(resposta.status).to.equal(200)
                        
            const respostaEsperada = require('../fixture/respostas/quandoInformoValoresValidosEuTenhoSucesso.json');
            delete resposta.body.transfer.data;
            delete respostaEsperada.transfer.data;
            expect (resposta.body).to.eql(respostaEsperada);


            
        

            /*
            expect(resposta.body).to.have.property('message','Transferência realizada com sucesso.');
            expect(resposta.body.transfer).to.have.property('remetente', 'marlon');
            expect(resposta.body.transfer).to.have.property('destinatario', 'jamile');
            expect(resposta.body.transfer).to.have.property('valor', 1500);
            */

            //Reset do mock
            sinon.restore();
        })
    })
})

