import express from 'express';
import * as dotenv from 'dotenv';
import mysql from 'mysql'
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json())

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

app.use(cors());

console.log(process.env.DB_HOST, process.env.DB_PORT, process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD)

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);
  });




app.listen(3000);