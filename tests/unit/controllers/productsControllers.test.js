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

  describe('testando a resposta da criação de um produto', function () {

    it('testando uma criação bem sucedida', async function () {
      const res = {};
      const req = { body: { name: 'Capa da invisibilidade' } };
      const created = { message: { id: 4, name: 'Capa da invisibilidade' }, type: null }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'insertProduct').resolves(created)
      await productController.createProduct(req, res)

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(created.message);
    })

    it('testando uma criação mal sucedida', async function () {
      const res = {};
      const req = { body: { name: 'Capa' } };
      const notCreated = {
        type: 'INVALID_NAME', message: '"name" length must be at least 5 characters long',
      }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      // sinon.stub(productService, 'insertProduct').resolves(notCreated)
      await productController.createProduct(req, res)

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({message: notCreated.message});
    })
  })

})