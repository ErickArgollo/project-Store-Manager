const { expect } = require('chai');
const sinon = require('sinon');
const { salesService } = require('../../../src/services');
const {
  salesModel,
  productsModel
} = require('../../../src/models');

const {
  allSalesMock,
  saleByIdMock,
  newSalesMock,
  newSalesUpdateMock,
  invalidSalesMock,
  invalidSalesMockIdValue,
  invalidProductIdMock,
  deletedSaleMock,
} = require('./mocks/sales.service.mock');

describe('Unit test sales service', function () {

  describe('list all sales', function () {
    it('must be returns all sales', async function () {
      sinon.stub(salesModel, 'getAllSales').resolves(allSalesMock);
      
      const result = await salesService.getAllSales();

      expect(result).to.deep.equal(allSalesMock);
    });
  });

  describe('list a single product', function () {
    it('must be returns a single sale', async function () {
      sinon.stub(salesModel, 'getSale').resolves(saleByIdMock);
      
      const productId = 1;
      
      const result = await salesService.getSale(productId);

      expect(result).to.deep.equal(saleByIdMock);
    });

    it('must be raise error if id is invalid', async function () {
      sinon.stub(salesModel, 'getSale').resolves({"message": "\"value\" must be a number"});
      
      const productId = 'teste';

      try {
        await salesService.getSale(productId);
      } catch (error) {

        expect(error.message).to.have.be.equal("\"value\" must be a number")
      }

    });

     it('must be raise error if sale not found', async function () {
       sinon.stub(salesModel, 'getSale').resolves({"status": 404, "message": 'Sale not found'});
      
       const productId = 23;

       try {
        await salesService.getSale(productId);
       } catch (error) {
        expect(error.status).to.have.be.equal(404)
        expect(error.message).to.have.be.equal('Sale not found')
      }
     
    });
  });

  describe('insert new sale', function () {
    it('must be returns saleId', async function () {
      sinon.stub(productsModel, 'getProduct').resolves([{id: 1}])
      sinon.stub(salesModel, 'insertSale').resolves(1);
      
      const result = await salesService.insertNewSales(newSalesMock);

      expect(result).to.deep.equal(1);
    });

    it('must be raise error if productId is not provided', async function () {
      sinon.stub(salesModel, 'insertNewSales').resolves();
      
      try {
        await salesService.insertNewSales(invalidSalesMock);
      } catch (error) {
        expect(error.status).to.have.be.equal(400);
        expect(error.message).to.have.be.equal('"productId" is required')
      }

    });

    it('must be raise error if productId has invalid id value', async function () {
      sinon.stub(salesModel, 'insertNewSales').resolves();
      
      try {
        await salesService.insertNewSales(invalidSalesMockIdValue);
      } catch (error) {
        expect(error.status).to.have.be.equal(422);
        expect(error.message).to.have.be.equal('"productId" must be greater than or equal to 1')
      }

    });

    it('must be raise error if productId do not exists', async function () {
      sinon.stub(productsModel, 'getProduct').throws(Object({ status: 404, message: "Product not found" }));
      
      try {
       await salesService.insertNewSales(invalidProductIdMock);
    
      } catch (error) {
        sinon.assert.match(error.status, 404);
        sinon.assert.match(error.message, "Product not found");
      }

    });

  });

  describe('delete sale', function () {
    it('must be returns correctly', async function () {
      sinon.stub(salesModel, 'getSale').resolves(allSalesMock)
      sinon.stub(salesModel, 'deleteSale').resolves(deletedSaleMock);
      const saleId = 1
      const result = await salesService.deleteSale(saleId);

      expect(result).to.deep.equal(deletedSaleMock);
    });

    it('must be raise error if sale do not exists ', async function () {
      sinon.stub(salesModel, 'getSale').resolves([]);
      const saleId = 40
      
      try {
        await salesService.deleteSale(saleId);
      } catch (error) {
        expect(error.status).to.have.be.equal(404);
        expect(error.message).to.have.be.equal('Sale not found')
      }

    });

    it('must be raise error if id is invalid ', async function () {
      sinon.stub(salesModel, 'getSale').resolves({"message": "\"value\" must be a number"});
      
      const productId = 'teste';

      try {
        await salesService.deleteSale(productId);
      } catch (error) {
        expect(error.message).to.have.be.equal("\"value\" must be a number")
      }
    });

  });

  describe('update Sale', function () {
    it('must be returns correctly', async function () {
      sinon.stub(salesModel, 'getSale').resolves([{id: 1}])
      sinon.stub(salesModel, 'updateSale').resolves(newSalesUpdateMock);
      
      const result = await salesService.updateSale(1, newSalesMock);

      expect(result).to.contain(newSalesUpdateMock);
    });

    it('must be raise error if productId is not provided', async function () {
      sinon.stub(salesModel, 'updateSale').resolves();
      
      try {
        await salesService.updateSale(1, invalidSalesMock);
      } catch (error) {
        expect(error.status).to.have.be.equal(400);
        expect(error.message).to.have.be.equal('"productId" is required')
      }

    });

    it('must be raise error if productId has invalid id value', async function () {
      sinon.stub(salesModel, 'updateSale').resolves();
      
      try {
        await salesService.updateSale(1,invalidSalesMockIdValue);
      } catch (error) {
        expect(error.status).to.have.be.equal(422);
        expect(error.message).to.have.be.equal('"productId" must be greater than or equal to 1')
      }

    });

  });

  
  
  afterEach(function () {
     sinon.restore();
  });

});