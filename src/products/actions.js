import database from '../database/mysql';
import Bluebird from 'bluebird';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import queries from '../migrations/queriesSql';

const {getProducts, listProducts} = queries;
const { con } = database;

Bluebird.promisifyAll(jwt);
Bluebird.promisifyAll(bcrypt);


function getOneProduct(id) {
  return new Promise((resolve, reject) => {
    con.query(getProducts, [Number(id)], (err, results) => {
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
  const product: Object = await getOneProduct(id);
  res.status(200).send({ success: true, message: `Product with id ${id}`, body: product });
} catch (error) {
  res.status(500).send({ success: false, message: error.message });

}
  await next;
}


function listAllProducts(){
  return new Promise((resolve, reject)=>{
    con.query(listProducts, (err, results)=>{
      if(err){
        reject(err);
      }
      resolve(results);
    });
  });
}

async function list (req, res, next) {
  try{
    const products: Array = await listAllProducts();
    res.status(200).send({ success: true, message: "All products", body: products});
  }  catch (error){
    res.status(500).send({ success: false, message: error.message});
  }
  await next;
}


export default {
  get,
  list
}