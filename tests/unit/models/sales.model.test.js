const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');

const connection = require('../../../src/models/db/connection');
const { newSalesMock, allSalesMock, saleByIdMock } = require('./mocks/sales.model.mock');

describe('Unit tests sales model', async function () {
  describe('get sales', async function () {
    it('select all sales', async function () {
   
    sinon.stub(connection, 'execute').resolves([allSalesMock]);
   
    const result = await salesModel.getAllSales();
   
    expect(result).to.be.deep.equal(allSalesMock);
  });

    it('select sale by id', async function () {
    
    sinon.stub(connection, 'execute').resolves([saleByIdMock]);

    const saleId = 2;
   
    const result = await salesModel.getSale(saleId);
    
    expect(result).to.be.deep.equal(saleByIdMock);
    });
  })
  
  describe('post new sale', async function () {
    it('insert sale', async function () {
    sinon.stub(connection, 'execute').resolves([{insertId: 1}])
   
    const result = await salesModel.insertSale();
   
    expect(result).to.be.deep.equal(1);
    })

    it('insert sales', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }])
    const saleId = 2;
   
    const result = await salesModel.insertNewSales(newSalesMock[0], saleId);
   
    expect(result).to.be.deep.equal(1);
    })
  })

  describe('delete sale', async function () {
    it('delete sale', async function () {
    sinon.stub(connection, 'execute').resolves([{affectedRows: 1}])
   
    const result = await salesModel.deleteSale(1);
   
    expect(result).to.be.deep.equal({affectedRows: 1});
    })

  })

  describe('update sale', async function () {
    it('update sale', async function () {
    sinon.stub(connection, 'execute').resolves([{affectedRows: 1}])
   
      const result = await salesModel.updateSale(1, newSalesMock);
      console.log(result);
   
    expect(result).to.be.deep.equal({affectedRows: 1});
    })

  })

  afterEach(function () {
    sinon.restore();
  });
});