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

const salesMockWithoutProductId = [
  {
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
]

const salesMock = {
  "id": 3,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
}

module.exports = {
  allSalesMock,
  saleByIdMock,
  salesMock,
  newSalesMock,
  salesMockWithoutProductId
}