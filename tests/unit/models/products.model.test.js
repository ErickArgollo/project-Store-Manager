const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');

const connection = require('../../../src/models/db/connection');
const { allProducts, deleteMock } = require('./mocks/products.model.mock');

describe('Unit tests products model', function () {
  it('select all products', async function () {
   
    sinon.stub(connection, 'execute').resolves([allProducts]);
   
    const result = await productsModel.getAllProducts();
   
    expect(result).to.be.deep.equal(allProducts);
  });

  it('select product by id', async function () {
    
    sinon.stub(connection, 'execute').resolves([[allProducts[0]]].flat());
    const productId = 1;
    const result = await productsModel.getProduct(productId);
    
    expect(result).to.be.deep.equal(allProducts[0]);
  });

  it('insert new product', async function () {
    sinon.stub(connection, 'execute').resolves([{insertId: 1}])
    const name = "xablau";
   
    const result = await productsModel.insertNewProduct(name);
   
    expect(result).to.be.deep.equal(1);
  })

  it('update product', async function () {
    sinon.stub(connection, 'execute').resolves([{insertId: 1}])
    const productId = 1 
   
    const result = await productsModel.updateProduct(productId, { body: {name: "teste"}});
    expect(result).to.be.deep.equal({insertId: 1});
  })


  it('delete product', async function () {
    sinon.stub(connection, 'execute').resolves([deleteMock])
    const productId = 1 
   
    const result = await productsModel.deleteProduct(productId);
    expect(result).to.be.deep.equal(deleteMock);
  })

  afterEach(function () {
    sinon.restore();
  });
});