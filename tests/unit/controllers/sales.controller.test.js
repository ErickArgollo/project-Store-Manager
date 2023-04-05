const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const {
  salesMock,
  salesMockWithoutProductId,
  newSalesMock,
  salesByIdMock,
} = require('./mocks/sales.controller.mock');

describe('Unit test sales controller', function () {

  describe('list all sales', function () {
    it('must be return with status 200 and a list of sales', async function () {
      const res = {};
      const req = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'getAllSales')
        .resolves(salesMock);

      await salesController.getAllSales(req, res);
    
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(salesMock);
    });
  });


  describe('find sales by id', function () {
    it('must be return with 200 and sales info if valid id', async function () {
      
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'getSale')
        .resolves(salesByIdMock[0]);

      await salesController.getSale(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(salesByIdMock[0]);
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
        .stub(salesService, 'getSale')
        .throws(Object({ status: 404, message: "\"value\" must be a number" }))

      
      await salesController.getSale(req, res, next);
       
      sinon.assert.calledWith(next, sinon.match({
        status: 404,
        message: "\"value\" must be a number"
     }));
    });
  });

  describe('post new sale', function () {
    it('must be return with status 201 and new sale info', async function () {
      const res = {};
      const req = newSalesMock;
      const insertId = 3;
      const next = sinon.stub();
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'insertNewSales')
        .resolves(insertId);

      await salesController.insertNewSales(req, res, next);
      
    
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWithMatch({id: 3});
    });

    it('must be return with status 400 and raise error if productId is not provided', async function () {
      const res = {};
      const req = salesMockWithoutProductId;
      const next = sinon.stub();
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'insertNewSales')
        .throws(Object({ status: 400, message: "\"productId\" is required" }));

      await salesController.insertNewSales(req, res, next);
      
    
      sinon.assert.calledWith(next, sinon.match({
        status: 400,
        message: "\"productId\" is required"
      }));
    });
  });

   describe('delete sale', function () {
    it('must be return with status 204', async function () {
      const res = {};
      const req = { 
        params: {id : 1}
      };
      const next = sinon.stub();
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'deleteSale')
        .resolves();

      await salesController.deleteSale(req, res,next);
    
      expect(res.status).to.have.been.calledWith(204);
      expect(res.json).not.to.have.been.called;
    });
   });
  
  describe('update sale', function () {
    it('must be return with status 200', async function () {
      const res = {};
      const req = { 
        params: {id : 1}
      };
      const next = sinon.stub();
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'updateSale')
        .resolves();

      await salesController.updateSale(req, res,next);
    
      expect(res.status).to.have.been.calledWith(200);
    });

    it('must be return with status 400 and raise error if productId is not provided', async function () {
      const res = {};
      const req = {
        params: { id: 1 },
        body: salesMockWithoutProductId
      };
      const next = sinon.stub();
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'updateSale')
        .throws(Object({ status: 400, message: "\"productId\" is required" }));

      await salesController.updateSale(req, res, next);
      
    
      sinon.assert.calledWith(next, sinon.match({
        status: 400,
        message: "\"productId\" is required"
      }));
    });
  });
  
   afterEach(function () {
    sinon.restore();
  });

});