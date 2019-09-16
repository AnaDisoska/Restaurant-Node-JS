import database from '../database/mysql';
import Bluebird from 'bluebird';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import queries from '../migrations/queriesSql';


const { createADelivery, getDelivery, listDeliveries } = queries;
const { con } = database;

Bluebird.promisifyAll(jwt);
Bluebird.promisifyAll(bcrypt);

function createDeliveryInfo (profile_id, order_id, product_id){
  return new Promise ((resolve, reject)=>{
    con.query(createADelivery, [profile_id, order_id, product_id], (err, results)=>{
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
    profile_id,
    order_id,
    product_id
}: {
  profile_id: number,
  order_id: number,
  product_id: number
} = req.body;


try{ 
  
  const createDelInfo = await createDeliveryInfo(profile_id, order_id, product_id);
  res.status(201).send({success: true, message: 'Delivery info', body: { profile_id, order_id, product_id }});

} catch (error){
  res.status(500).send({ success: false, message: error.message});
}
await next;
}


function getDeliveryByid(id) {
  return new Promise((resolve, reject) => {
    con.query(getDelivery, [Number(id)], (err, results) => {
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
  const delivery: Object = await getDeliveryByid(id);
  res.status(200).send({ success: true, message: `Delivery with id ${id}`, body: delivery });
} catch (error) {
  res.status(500).send({ success: false, message: error.message });

}
  await next;
}


function listAllDel(){
  return new Promise((resolve, reject)=>{
    con.query(listDeliveries, (err, results)=>{
      if(err){
        reject(err);
      }
      resolve(results);
    });
  });
}

async function list (req, res, next) {

  try{
    const dels: Array = await listAllDel();
    res.status(200).send({ success: true, message: "All deliveries", body: facilities});
  }  catch (error){
    res.status(500).send({ success: false, message: error.message});
  }
  await next;
}



export default {
  create,
  get,
  list
}