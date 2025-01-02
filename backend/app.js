const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const handleError = require('./middlewares/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

require('dotenv').config();

const formRoutes = require('./routes/formRoutes');

const app = express();
const PORT = process.env.PORT || 3005;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(requestLogger);
app.use(helmet());

// Подключение маршрутов
app.use('/', formRoutes);

app.use(errorLogger);

app.use(handleError);

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

