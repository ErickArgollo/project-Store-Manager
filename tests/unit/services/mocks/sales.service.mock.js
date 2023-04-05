const allSalesMock = [
  {
    "saleId": 1,
    "date": "2023-02-14T19:19:28.000Z",
    "productId": 1,
    "product_id": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2023-02-14T19:19:28.000Z",
    "productId": 2,
    "product_id": 2,
    "quantity": 10
  },
  {
    "saleId": 1,
    "date": "2023-02-14T19:19:28.000Z",
    "productId": 1,
    "product_id": 1,
    "quantity": 1
  },
  {
    "saleId": 1,
    "date": "2023-02-14T19:19:28.000Z",
    "productId": 2,
    "product_id": 2,
    "quantity": 5
  },
]

const saleByIdMock = [
  {
    "date": "2023-02-14T19:19:28.000Z",
    "productId": 3,
    "quantity": 15
  }
]

const newSalesMock = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
]

const newSalesUpdateMock = [
  {
    fieldCount: 0,
    affectedRows: 4,
    insertId: 0,
    info: 'Rows matched: 4  Changed: 4  Warnings: 0',
    serverStatus: 2,
    warningStatus: 0,
    changedRows: 4
  },
  {
    fieldCount: 0,
    affectedRows: 4,
    insertId: 0,
    info: 'Rows matched: 4  Changed: 4  Warnings: 0',
    serverStatus: 2,
    warningStatus: 0,
    changedRows: 4
  }
]


const invalidSalesMock = [
  {
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
]

const invalidSalesMockIdValue = [
  {
    "productId": 0,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
]

const invalidProductIdMock = [
  {
    "productId": 10,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
]

const deletedSaleMock = {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  info: '',
  serverStatus: 2,
  warningStatus: 0
}



module.exports = {
  allSalesMock,
  deletedSaleMock,
  saleByIdMock,
  newSalesMock,
  newSalesUpdateMock,
  invalidSalesMock,
  invalidSalesMockIdValue,
  invalidProductIdMock,

}