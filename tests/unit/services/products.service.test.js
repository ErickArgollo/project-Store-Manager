const { expect } = require('chai');
const sinon = require('sinon');
const { productsService } = require('../../../src/services');
const {
  productsModel,
} = require('../../../src/models');

const {
  allProducts,
  invalidInputMessage,
  productNotFoundMessage,
  updateMock,
  queryProductMock
} = require('./mocks/products.service.mock');

describe('Unit test service product', function () {
  describe('list all products', function () {
    it('must be returns the list of products', async function () {
      sinon.stub(productsModel, 'getAllProducts').resolves(allProducts);
      
      const result = await productsService.getAllProducts();

      expect(result).to.deep.equal(allProducts);
    });
  });

  describe('list query products', function () {
    it('must be returns the list of products if query exists', async function () {
      sinon.stub(productsService, 'getAllProducts').resolves(queryProductMock);
      sinon.stub(productsModel, 'getAllProducts').resolves(queryProductMock);

      const result = await productsService.getQueryProducts('m');

      expect(result).to.deep.equal(queryProductMock);
    });

    it('must be returns all products if query do not exists', async function () {
      sinon.stub(productsService, 'getAllProducts').resolves(allProducts);
      
      const result = await productsService.getQueryProducts('');

      expect(result).to.deep.equal(allProducts);
    });
  });

  describe('list a single product', function () {
    it('must be returns a single products', async function () {
      sinon.stub(productsModel, 'getProduct').resolves([[allProducts[0]]].flat());
      
      const productId = 1;
      
      const result = await productsService.getProduct(productId);

      expect(result).to.deep.equal(allProducts[0]);
    });

    it('must be raise error if id is invalid', async function () {
      sinon.stub(productsModel, 'getProduct').resolves(invalidInputMessage);
      
      const productId = 'teste';

      try {
        await productsService.getProduct(productId);
      } catch (error) {
        expect(error.message).to.have.be.equal(invalidInputMessage.message)
      }

    });

     it('must be raise error if user not found', async function () {
       sinon.stub(productsModel, 'getProduct').resolves(productNotFoundMessage);
      
       const productId = 23;

       try {
        await productsService.getProduct(productId);
       } catch (error) {
        expect(error.status).to.have.be.equal(404)
        expect(error.message).to.have.be.equal(productNotFoundMessage.message)
      }
     
    });
  });

  describe('insert new product', function () {
    it('must be returns insertId', async function () {
      sinon.stub(productsModel, 'insertNewProduct').resolves(1);
      const name = { name: "teste" };
      
      const result = await productsService.insertNewProduct(name);

      expect(result).to.deep.equal(1);
    });

    it('must be raise error if name is not provided', async function () {
      sinon.stub(productsModel, 'insertNewProduct').resolves();
      const name = { name: "" };
      
      try {
        await productsService.insertNewProduct(name);
      } catch (error) {
        expect(error.status).to.have.be.equal(400);
        expect(error.message).to.have.be.equal('"name" is required')
      }

    });

    it('must be raise error if name do not have min length', async function () {
      sinon.stub(productsModel, 'insertNewProduct').resolves();
      const name = { name: "t" };
      
      try {
        await productsService.insertNewProduct(name);
      } catch (error) {
        expect(error.status).to.have.be.equal(422);
        expect(error.message).to.have.be.equal('"name" length must be at least 5 characters long')
      }

    });
  });
  
  describe('update product', function () {
    it('must be returns correctly', async function () {
      sinon.stub(productsModel, 'updateProduct').resolves(updateMock);
      const id = 1
      const body = { name: "teste" };
      
      const result = await productsService.updateProduct({ id, body});

      expect(result).to.deep.equal(updateMock);
    });

    it('must be raise error if name is not provided', async function () {
      sinon.stub(productsModel, 'updateProduct').resolves();
      const id = 1;
      const body = { name: "" };
      
      try {
        await productsService.updateProduct({id, body});
      } catch (error) {
        expect(error.status).to.have.be.equal(400);
        expect(error.message).to.have.be.equal('"name" is required')
      }

    });

    it('must be raise error if invalid id', async function () {
      sinon.stub(productsModel, 'updateProduct').resolves();
      const body = { name: "teste1" };
      const id = 'oioi'
      
      try {
        await productsService.updateProduct({ id, body });
      } catch (error) {
        expect(error.status).to.have.be.equal(404);
        expect(error.message).to.have.be.equal('"value" must be a number')
      }

    });

    it('must be raise error if product not exists', async function () {
      sinon.stub(productsModel, 'getProduct').resolves([]);
      sinon.stub(productsModel, 'updateProduct').resolves();
      const body = { name: "teste1" };
      const id = 40
      
      try {
        await productsService.updateProduct({ id, body });
      } catch (error) {
        expect(error.status).to.have.be.equal(404);
        expect(error.message).to.have.be.equal('Product not found')
      }
    });
  });

  describe('delete product', async function () {
    it('must be returns correctly', async function () {
      sinon.stub(productsModel, 'deleteProduct').resolves(updateMock);
      const id = 1;
      
      const result = await productsService.deleteProduct(id);
     
      expect(result).to.have.be.deep.equal(updateMock)
     
    })

    it('must be raise error if invalid id', async function () {
      sinon.stub(productsModel, 'deleteProduct').resolves();
      const id = 'oioi'
      
      try {
        await productsService.deleteProduct(id);
      } catch (error) {
        expect(error.status).to.have.be.equal(404);
        expect(error.message).to.have.be.equal('"value" must be a number')
      }

    });

    it('must be raise error if product not exists', async function () {
      sinon.stub(productsModel, 'getProduct').resolves([]);
      sinon.stub(productsModel, 'updateProduct').resolves();
      const id = 40
      
      try {
        await productsService.deleteProduct(id);
      } catch (error) {
        expect(error.status).to.have.be.equal(404);
        expect(error.message).to.have.be.equal('Product not found')
      }
    });

  })

  afterEach(function () {
     sinon.restore();
  });

});