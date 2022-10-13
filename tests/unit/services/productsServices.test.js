const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productModel } = require('../../../src/models')
const { productService } = require('../../../src/services');

describe('Testes de unidade do service dos produtos', function () {
  afterEach(sinon.restore);

  describe('testando a função findById', function () {

    it('testa a função findById com id existente', async function () {
      const product = {
        "id": 1,
        "name": "Martelo de Thor"
      }
      const response = { type: null, message: product }
      sinon.stub(connection, 'execute').resolves([[product]]);

      const result = await productService.findProduct(1)
      expect(result.message).to.deep.equal(product)
      expect(result.type).to.equal(null)
    })

    it('testa a função findById com id invalido', async function () {
      const inputError = { type: 'INVALID_VALUE', message: '"id" must be a number' }

      const result = await productService.findProduct('a')
      expect(result).to.deep.equal(inputError)
    })

    it('testa a função findById com produto inexistente', async function () {
      const product = undefined;
      const response = { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' }
      sinon.stub(connection, 'execute').resolves([[product]]);

      const result = await productService.findProduct(999)
      expect(result).to.deep.equal(response)

    })
  })

  describe('testando a função findAllProducts', function () {

    it('testando a listagem de todos os produtos', async function () {
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
      const result = await productService.findAllProducts();
      expect(result.message).to.deep.equal(response)
    })


    it('testando a listagem falha', async function () {
      const error = { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' }
      sinon.stub(connection, 'execute').resolves([]);
      const result = await productService.findAllProducts();
      expect(result).to.deep.equal(error)
    })
  })

});