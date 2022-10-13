const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productModel } = require('../../../src/models');
const { productService } = require('../../../src/services');
const { productController } = require('../../../src/controllers');

describe('teste de unidade da camada products controller', function () {
  afterEach(sinon.restore);
  describe('testes da função listProducts', function () {
    

    it('testando o retorno de uma listagem total', async function () {
      const res = {};
      const req = {};
      const productList = [
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

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'findAllProducts').resolves({ type: null, message: productList });

      await productController.listProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productList);

    })

    it('testando o retorno de erro de uma listagem total', async function () {
      const res = {};
      const req = {};
      const error = { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' }

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'findAllProducts').resolves(error);

      await productController.listProducts(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith(error.message);

    })

  })

  describe('testes da função getProducts', function () {
    afterEach(sinon.restore);

    it('testando o retorno de um produto', async function () {
      const res = {};
      const req = { params: { id: 1 } };
      const product = {
        "id": 1,
        "name": "Martelo de Thor"
      }

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'findProduct').resolves({ type: null, message: product });

      await productController.getProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(product);

    })

    it('testando o retorno de um produto nao encontrado', async function () {
      const res = {};
      const req = { params: { id: 999 } };
      const error = { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' }

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'findProduct').resolves(error);

      await productController.getProduct(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: error.message });

    })
  })

})