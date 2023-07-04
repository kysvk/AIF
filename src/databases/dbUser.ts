import db from './connect';

interface Database {
  getUser: () => Promise<any>;
  getUserbyID:(user_id:any) => Promise<any>;
  addUser: (email:string, name:string, password:string ) => Promise<any>;
  updateUser:(email:string,name:string,user_id:any) => Promise<any>
  deleteUser:(user_id:number) => Promise<any>
  findUserbyEmail: (email: string) => Promise<any>;
  
}

const extendedDb: Database = {
  ...db,
  getUser: (): Promise<any> => {
    return db.query(`SELECT * FROM user_table`);
  },
  getUserbyID: (user_id:any): Promise<any> => {
    return db.query(`SELECT * FROM user_table WHERE user_id = ${user_id}`);
  },
  addUser: (email:string, name:string, password:string): Promise<any> => {
    return db.query(`INSERT INTO user_table (email,name,password,role) VALUES ("${email}","${name}","${password}",role="user");`);
  },
  updateUser:(email:string,name:string,user_id:any): Promise<any> => {
    return db.query(`update user_table set email="${email}",name="${name}" where user_id = "${user_id}";`);
  },
  deleteUser:(user_id:number): Promise<any> => {
    return db.query(`delete FROM user_table WHERE user_id = ${user_id};`);
  },
  findUserbyEmail: (email: string): Promise<any> => {
    return db.query(`SELECT * FROM user_table WHERE email = "${email}";`);
  },
};

export default extendedDb;
