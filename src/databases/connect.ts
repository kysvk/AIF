import mysql from 'mysql';

interface DB {
  connect: mysql.Connection;
  query: (databaseQuery: string) => Promise<any>;
  queryRes: (databaseQuery: string, response: any) => Promise<any>;
  test: () => void;
}


const db: DB = {
  connect: mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "login",
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