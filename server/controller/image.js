const client = require('../db/connection');
const cassandra = require('cassandra-driver');
const Uuid = cassandra.types.Uuid;

exports.restaurantImages = (req, res) => {
  const query = `SELECT * from ravingz.images_by_restaurant WHERE restaurantid = ${req.params.id}`;
  client.execute(query)
    .then((result) => {
      res.json(result.rows)
    })
    .catch(err => console.log(err));  
}

exports.getImage = (req, res) => {
  const query = `SELECT * from ravingz.images_by_restaurant WHERE imageid = ${req.params.id}`;
  
  client.execute(query)
    .then((result) => {
      res.json(result.rows)
    })
    .catch(err => console.log(err));  
}

exports.getImages = (req, res) => {
  const query = `SELECT * from ravingz.images_by_restaurant`;
  
  client.execute(query)
    .then((result) => {
      res.json(result.rows)
    })
    .catch(err => console.log(err));  
}

exports.createImage = (req, res) => {
  const {restaurantid, username, profileurl, comment, imageurls } = req.body;
  const imageid = Uuid.random();
  const createad = new Date();
  const query = `INSERT INTO ravingz.images_by_restaurant (
    imageid,
    restaurantid,
    username,
    profileurl,
    comment,
    imageurls, 
    createdat
    ) VALUES (${imageid}, ${restaurantid}, ${username}, ${profileurl}, ${comment}, ${imageurls}, ${createad})`;

  client.execute(query)
    .then((result) => {
      res.json(result.rows)
    })
    .catch(err => console.log(err));  
}

exports.updateImage = (req, res) => {
  const { imageid, comment } = req.body;
  const query = `UPDATE FROM ravingz.images_by_restaurant SET comment='${comment}' WHERE imageid = ${imageid}`;

  client.execute(query)
    .then((result) => {
      res.json(result.rows)
    })
    .catch(err => console.log(err));  
}

exports.deleteImage = (req, res) => {
  const { imageid } = req.body;
  const query = `DELETE FROM ravingz.images_by_restaurant WHERE imageid = ${imageid}`;

  client.execute(query)
    .then((result) => {
      res.json(result.rows)
    })
    .catch(err => console.log(err));  
}