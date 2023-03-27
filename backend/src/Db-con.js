const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 8889,
  user: 'root',
  password: 'root',
  database: 'budgetboss'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL!');
  // you can now perform MySQL queries using this connection
});

// when you're done with the connection, close it
connection.end();
