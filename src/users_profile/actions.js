import database from '../database/mysql';
import Bluebird from 'bluebird';
import bcrypt from 'bcrypt';
import queries from '../migrations/queriesSql';

const{ createUsersProfile, delUserProfile, listUsersProfiles, getSingleUserProfile, updateUserProfile, listResByProfileId } = queries;

const { con } = database;


function createProfile (userId, firstName, lastName, address, creditCard, phoneNumber){
  return new Promise ((resolve, reject)=>{
    con.query(createUsersProfile, [userId, firstName, lastName, address, creditCard, phoneNumber], (err, results)=>{
      console.log(err);
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

async function create (req, res, next){
  const { userId }: { userId: string } = req.params;
const {
  firstName,
  lastName,
  address,
  creditCard,
  phoneNumber
}: {
  firstName: string,
  lastName: string,
  address: string,
  creditCard: number,
  phoneNumber: number
} = req.body;


try{
  const createUserProfile = await createProfile(userId, firstName, lastName, address, creditCard, phoneNumber);
  res.status(201).send({success: true, message: 'The user has successfully created a profile', body: {firstName, lastName, address, phoneNumber}});
} catch (error){
  res.status(500).send({ success: false, message: error.message});
}
await next;
}

function deleteUserProfile(id){
  return new Promise((resolve, reject)=>{
    con.query(delUserProfile, parseInt(id), (err, results)=>{
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
  const user: Object = await deleteUserProfile(id);
  res.status(200).send({ success: true, message: `The user with id ${id} is deleted`});
} catch (error){
  res.status(500).send({ success: false, message: error.message});
}

await next;
}

function listProfiles(){
  return new Promise((resolve, reject)=>{
    con.query(listUsersProfiles, (err, results)=>{
      if(err){
        reject(err);
      }
      resolve(results);
    });
  });
}

async function list (req, res, next) {
  try{
    const users: Array = await listProfiles();
    res.status(200).send({ success: true, message: "A list of all profiles", body: users});
  }  catch (error){
    res.status(500).send({ success: false, message: error.message});
  }
  await next;
}

function getProfileById(id) {
  return new Promise((resolve, reject) => {
    con.query(getSingleUserProfile, [Number(id)], (err, results) => {
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
  const user: Object = await getProfileById(id);
  res.status(200).send({ success: true, message: `User with id ${id}`, body: user });
} catch (error) {
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