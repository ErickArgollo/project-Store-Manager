const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const {
  allProducts,
  newProduct,
  queryMock
} = require('./mocks/products.controller.mock');

describe('Unit test products controller', function () {
  describe('list all products', function () {
    it('must be return with status 200 and a list of products', async function () {
      const res = {};
      const req = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'getAllProducts')
        .resolves(allProducts);

      await productsController.getAllProducts(req, res);
    
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProducts);
    });
  });

  describe('query products', function () {
    it('must be return with status 200 and correct info', async function () {
      const res = {};
      const req = {
        query: { q: 'Martelo' }
      };
      const next = sinon.stub()
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'getQueryProducts')
        .resolves(queryMock);

      await productsController.getQueryProducts(req, res, next);
    
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(queryMock);
    });
  });



  describe('find product by id', function () {
    it('must be return with 200 and product info if valid id', async function () {
      
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'getProduct')
        .resolves(allProducts[0]);

      await productsController.getProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProducts[0]);
    });
    
    it('must be return status 404 and raise error if invalid id', async function () {
      
      const res = {};
      const req = {
        params: { id: 'teste' },
      };
      const next = sinon.stub()

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
       
       
      sinon
        .stub(productsService, 'getProduct')
        .throws(Object({ status: 404, message: "\"value\" must be a number" }))

      
      await productsController.getProduct(req, res, next);
       
      sinon.assert.calledWith(next, sinon.match({
        status: 404,
        message: "\"value\" must be a number"
     }));
    });
     
    it('must be return status 404 and raise error if product not found', async function () {
      
      const res = {};
      const req = {
        params: { id: 15 },
      };
      const next = sinon.stub() 
       
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'getProduct')
        .throws(Object({ status: 404, message: "\"value\" must be a number" }));

      await productsController.getProduct(req, res, next);
        
      sinon.assert.calledWith(next, sinon.match({
        status: 404,
        message: "\"value\" must be a number"
      }));
      
    });

  });

  describe('post new product', function () {
    
    it('must be return with status 200 and product info', async function () {
      const res = {};
      const req = newProduct;
      const next = sinon.stub();
      const insertId = 4;
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'insertNewProduct')
        .resolves(insertId);

      await productsController.insertNewProduct(req, res, next);
      
    
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({id: 4});
    });

    it('must be return with status 400 and raise error if name is not provided', async function () {
      const res = {};
      const req = { name: "" };
      const next = sinon.stub();
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'insertNewProduct')
        .throws(Object({ status: 400, message: "\"name\" is required" }));

      await productsController.insertNewProduct(req, res, next);
      
    
      sinon.assert.calledWith(next, sinon.match({
        status: 400,
        message: "\"name\" is required"
      }));
    });
  });

  describe('update product', function () {
    
    it('must be return with status 200 and product info', async function () {
      const res = {};
      const req = {
        params: { id: 4 },
        body: newProduct,
      };
      const next = sinon.stub();
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'updateProduct')
        .resolves();

      await productsController.updateProduct(req, res, next);
      
    
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({id: 4, name: "teste"});
    });

    it('must be return with status 400 and raise error if name is not provided', async function () {
      const res = {};
      const req = {
        params: { id: 4 },
        body: { name: ''},
      };
      const next = sinon.stub();
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'updateProduct')
        .throws(Object({ status: 400, message: "\"name\" is required" }));

      await productsController.updateProduct(req, res, next);
      
    
      sinon.assert.calledWith(next, sinon.match({
        status: 400,
        message: "\"name\" is required"
      }));
    });
  });

  describe('delete product', async function() {
    it('must be return with status 204', async function () {
      const res = {};
      const req = {
        params: { id: 4 }
      };
      const next = sinon.stub();
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'deleteProduct')
        .resolves();

      await productsController.deleteProduct(req, res, next);
      
    
      expect(res.status).to.have.been.calledWith(204);
      expect(res.json).not.to.have.been.called;
    });
  })
  
   afterEach(function () {
    sinon.restore();
  });

});