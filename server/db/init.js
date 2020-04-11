module.exports = async client => {
  await client.connect();
  await client.execute(`CREATE KEYSPACE IF NOT EXISTS ravingz WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1' }`);
  await client.execute(`USE ravingz`);

  await client.execute(`CREATE TABLE IF NOT EXISTS restaurants (
    restaurantid int, 
    name varchar, 
    createdat timestamp, 
    PRIMARY KEY (restaurantid)
    )`);

  await client.execute(`CREATE TABLE IF NOT EXISTS images_by_restaurant (
    imageid int, 
    restaurantid int, 
    username varchar, 
    profileurl text, 
    comment text, 
    imageurls list<text>, 
    createdat timestamp, 
    PRIMARY KEY (restaurantid, createdat, imageid)
    )`);
};