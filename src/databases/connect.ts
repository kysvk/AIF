import mysql from 'mysql';

interface DB {
  connect: mysql.Connection;
  query: (databaseQuery: string) => Promise<any>;
  queryRes: (databaseQuery: string, response: any) => Promise<any>;
  test: () => void;
}


const db: DB = {
  connect: mysql.createConnection({
    host: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  }),

  query: (databaseQuery: string) => {
    return new Promise((resolve, reject) => {
      db.connect.query(databaseQuery, function (error, result) {
        if (error) {
          console.log(error);
          reject(error);
        }
        resolve(result);
      });
    });
  },

  queryRes: (databaseQuery: string, response: any) => {
    return new Promise((resolve, reject) => {
      db.connect.query(databaseQuery, function (error, result) {
        if (error) {
          console.log(error);
          response.status(400).send(error.toString());
          // throw error;
        }
        try {
          resolve(result);
        } catch (error) {
          console.log('query err');
          resolve({});
          response.status(400).send(error.toString());
          // throw error;
        }
      });
    });
  },

  test: () => {
    db.connect.connect((err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("connect databases success");
      }
    });
  },
};

export default db;