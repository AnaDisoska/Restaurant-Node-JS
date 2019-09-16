import database from '../database/mysql';
import Bluebird from 'bluebird';
import bcrypt from 'bcrypt';
import queries from '../migrations/queriesSql';
import { userInfo } from 'os';

const{ regUser, delUser, listUsers, getSingleUser } = queries;

const { con } = database;


function usersReg (username, email, password){
  return new Promise ((resolve, reject)=>{
    con.query(regUser, [username, email, password], (err, results)=>{
      console.log(err);
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

async function create (req, res, next){
  
const {
  username,
  email,
  password
}: {
  username: string,
  email: string,
  password: string
} = req.body;


const salt = bcrypt.genSaltSync(10);
const getRounds = bcrypt.getRounds(salt);
const passHash = bcrypt.hashSync(password, getRounds);
 

try{
const createUser = await usersReg(username, email, passHash);

res.status(201).send({success: true, message: 'The user has been successfully registered', body: { username, email, password}});  
 
} catch (error){
  res.status(500).send({ success: false, message: error.message});
}
await next;
}

function deleteUser(id){
  return new Promise((resolve, reject)=>{
    con.query(delUser, parseInt(id), (err, results)=>{
      if (err){
        reject(err);
      }
      resolve(results);
    });
  });
}

async function del(req, res, next){
  const { id }: { id: string} = req.params;

try{
  const user: Object = await deleteUser(id);  
  res.status(200).send({ success: true, message: `The user with id ${id} is deleted`});
} catch (error){
  res.status(500).send({ success: false, message: error.message});
}

await next;
}


function getUser(id) {
  return new Promise((resolve, reject) => {
    con.query(getSingleUser, [Number(id)], (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

const get = async (req, res, next) => {
  const { id }: { id: string } = req.params;
try{
  const user: Object = await getUser(id);
  res.status(200).send({ success: true, message: `User with id ${id}`, body: user });
} catch (error) {
  res.status(500).send({ success: false, message: error.message });

}
  await next;
}


function listAllUsers(){
  return new Promise((resolve, reject)=>{
    con.query(listUsers, (err, results)=>{
      if(err){
        reject(err);
      }
      resolve(results);
    });
  });
}

async function list (req, res, next) {
  try{
    const users: Array = await listAllUsers();
    res.status(200).send({ success: true, message: "A list of all users", body: users});
  }  catch (error){
    res.status(500).send({ success: false, message: error.message});
  }
  await next;
}


export default {
  create,
  del,
  list,
  get
}