const express = require('express');
const { productsRouter, salesRouter } = require('./routers');

const app = express();

app.use(express.json());
app.use('/products', productsRouter);
app.use('/sales', salesRouter);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use((error, _req, res, _next) => {
  if (error.status) return res.status(error.status).json({ message: error.message });
  // para erros não monitorados
  res.status(500).json({ message: 'internal error' });
});
// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;