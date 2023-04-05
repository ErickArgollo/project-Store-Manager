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

const queryProductMock = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
]

const invalidInputMessage = {
  "message": "\"value\" must be a number"
}

const productNotFoundMessage = {
  "message": "Product not found"
}

const updateMock = {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  info: 'Rows matched: 1  Changed: 1  Warnings: 0',
  serverStatus: 2,
  warningStatus: 0,
  changedRows: 1
}



module.exports = {
  allProducts,
  invalidInputMessage,
  updateMock,
  productNotFoundMessage,
  queryProductMock
}