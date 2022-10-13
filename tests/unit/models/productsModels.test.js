const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productModel } = require('../../../src/models');

describe('Testes de unidade do model dos produtos', function () {
  afterEach(sinon.restore);

  it('buscando um produto existente', async function () {
    const response = {
      "id": 1,
      "name": "Martelo de Thor"
    };
    sinon.stub(connection, 'execute').resolves([[response]]);
    const result = await productModel.findById(1)
    expect(result).to.deep.equal(response);
  });

  it('buscando todos os produtos existentes', async function () {
    const response = [
      {
        "id": 1,
        "name": "Martelo de Thor"
      },
      {
        "id": 2,
        "name": "Traje de encolhimento"
      },
      {
        "id": 3,
        "name": "Escudo do Capitão América"
      }
    ]
    sinon.stub(connection, 'execute').resolves([response]);
    const result = await productModel.findAll();
    expect(result).to.deep.equal(response);
  });
});
