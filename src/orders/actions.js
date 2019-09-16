import database from '../database/mysql';
import Bluebird from 'bluebird';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import queries from '../migrations/queriesSql';

const { createAnOrder, getOrders, listOrders } = queries;
const { con } = database;

Bluebird.promisifyAll(jwt);
Bluebird.promisifyAll(bcrypt);


function createOrder (date_order, address, holder){
  return new Promise ((resolve, reject)=>{
    con.query(createAnOrder, [date_order, address, holder], (err, results)=>{
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
    date_order,
    address,
    holder
}: {
  date_order: string,
  address: string,
  holder: string
} = req.body;


try{ 
  
  const createOrder = await createOrder(date_order, address, holder);
  res.status(201).send({success: true, message: 'An order was successfully created', body: { date_order, address, holder }});

} catch (error){
  res.status(500).send({ success: false, message: error.message});
}
await next;
}

function getOrderById(id) {
  return new Promise((resolve, reject) => {
    con.query(getOrders, [Number(id)], (err, results) => {
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
  const order: Object = await getOrderById(id);
  res.status(200).send({ success: true, message: `Order with id ${id}`, body: order });
} catch (error) {
  res.status(500).send({ success: false, message: error.message });

}
  await next;
}


function listAllOrders(){
  return new Promise((resolve, reject)=>{
    con.query(listOrders, (err, results)=>{
      if(err){
        reject(err);
      }
      resolve(results);
    });
  });
}

async function list (req, res, next) {
  try{
    const orders: Array = await listAllOrders();
    res.status(200).send({ success: true, message: "All orders", body: orders});
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