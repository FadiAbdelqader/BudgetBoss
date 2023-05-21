/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expenseRoutes = require('./src/routes/expenseRoutes');
const tobuyRoutes = require('./src/routes/tobuyRoutes');
const pdfResumeRoutes = require('./src/routes/pdfResumeRoutes');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: '*'
}));

const PORT = process.env.PORT || 2001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://0.0.0.0:27017/budget-tracker';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use('/todos', tobuyRoutes);
app.use('/expenses', expenseRoutes);
app.use('/test', pdfResumeRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});