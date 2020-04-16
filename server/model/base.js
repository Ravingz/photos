const cassandra = require('cassandra-driver');
const client = require('../db/connection');

class Base {
  constructor(name) {
    this.name = name;
  }

  find(params = '') {
    const query = `SELECT * from ravingz.${this.name} ${params && `WHERE ${keyValueForUpdate(params)}`}`;
    return client.execute(query);
  }

  create(data) {
    const { keys, values } = keyValueForCreate(data);
    const createdat = new Date();
    const query = `INSERT INTO ravingz.${this.name} (${keys},createdat) VALUES (${values}, ${createdat})`;
    
    return client.execute(query);
  }

  update(id, data) {
    const columns = keyValueForUpdate(data);
    const tname = this.name.slice(0, this.name.length - 1);
    const query = `UPDATE ravingz.${this.name} SET ${columns} WHERE ${tname}id = ${id} IF EXISTS`;

    return client.execute(query);
  }

  delete(id) {
    const tname = this.name.slice(0, this.name.length - 1);
    const query = `DELETE FROM ravingz.${this.name} WHERE ${tname}id = ${id} IF EXISTS`;

    return client.execute(query);
  }
}

const keyValueForCreate = (obj) => {
  let keys = [];
  let values = [];

  for(let key in obj) {
    keys.push(key);

    Number(obj[key]) ? values.push(obj[key]) : values.push(`'${obj[key]}'`);
  }

  return {
    keys: keys.toString(),
    values: values.toString()
  }
}

const keyValueForUpdate = (obj) => {
  let string = "";

  for(let key in obj) {
    Number(obj[key]) ? string += `${key}=${obj[key]} ` : string += `${key}='${obj[key]}' `;
  }

  return string
}

module.exports = {
  Restaurant: new Base('restaurants'),
  Image: new Base('images_by_restaurant')
}