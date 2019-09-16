import database from '../database/mysql';
import Bluebird from 'bluebird';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import queries from '../migrations/queriesSql';

const{ createReservation, delRes, listRes, getRes} = queries;

const { con } = database;



function createReserv (dateAndTime, numberOfGuests){
  return new Promise ((resolve, reject)=>{
    con.query(createReservation, [dateAndTime, numberOfGuests], (err, results)=>{
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
  dateAndTime,
  numberOfGuests 
}: {
  dateAndTime: string,
  numberOfGuests: number
} = req.body;


try{ 
  
  const createReserv = await createReserv(dateAndTime, numberOfGuests);
  res.status(201).send({success: true, message: 'A reservation was successfully created', body: { dateAndTime, numberOfGuests }});

} catch (error){
  res.status(500).send({ success: false, message: error.message});
}
await next;
}

function deleteReservation(id){
  return new Promise((resolve, reject)=>{
    con.query(delRes, parseInt(id), (err, results)=>{
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
  const user: Object = await deleteReservation(id);
  res.status(200).send({ success: true, message: `The reservation with id ${id} is deleted`});
} catch (error){
  res.status(500).send({ success: false, message: error.message});
}

await next;
}

function getReservation(id) {
  return new Promise((resolve, reject) => {
    con.query(getRes, [Number(id)], (err, results) => {
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
  const reservation: Object = await getReservation(id);
  res.status(200).send({ success: true, message: `Reservation with id ${id}`, body: reservation });
} catch (error) {
  res.status(500).send({ success: false, message: error.message });

}
  await next;
}

function listAllReservations(){
  return new Promise((resolve, reject)=>{
    con.query(listRes, (err, results)=>{
      if(err){
        reject(err);
      }
      resolve(results);
    });
  });
}

async function list (req, res, next) {
  try{
    const reservations: Array = await listAllReservations();
    res.status(200).send({ success: true, message: "A list of reservations", body: reservations});
  }  catch (error){
    res.status(500).send({ success: false, message: error.message});
  }
  await next;
}





export default{
  create,
  del,
  list,
  get
}