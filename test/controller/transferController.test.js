const request = require('supertest');
const sinon = require('sinon');
const {expect} = require ('chai')

const app = require('../../app')

describe('Transfer Controller',()=>{
    describe('POST /transfers',()=>{
        it('Quando deixo de informar o remetente o retorno será 400', async ()=>{
            const resposta = await request(app)
                .post('/api/transfers')
                .send({
                   remetente: "" ,
                   destinatario:"jamile",
                   valor: 600
                });

                expect(resposta.status).to.equal(400)
                expect(resposta.body).to.have.property('message','Remetente, destinatario e valor são obrigatórios.')
            //console.log(resposta.body)
            
        })
    })
})

 