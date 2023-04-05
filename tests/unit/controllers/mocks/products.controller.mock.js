const allProducts = [
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

const newProduct = {
    "name": "teste"
}

const updatedProduct = {
  "name": "testando"
}

const queryMock = [
  {
    "id": 1,
    "name": "Martelo de Thor"
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

const salesMock = [
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
    "saleId": 2,
    "date": "2023-02-14T19:19:28.000Z",
    "productId": 3,
    "product_id": 3,
    "quantity": 15
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
  }
]

module.exports = {
  allProducts,
  newProduct,
  newSalesMock,
  updatedProduct,
  salesMockWithoutProductId,
  queryMock,
  salesMock
}