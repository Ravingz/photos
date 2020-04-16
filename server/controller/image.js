const { Image } = require('../model/base');

exports.getAllImages = async (req, res) => {
  try {
    const result = await Image.find();
    res.json(result.rows);

  } catch (error) {
    console.log(error)
  }
}

exports.create = async (req, res) => {
  try {
    // handle imageurls
    await Image.create(req.body)
    res.status(201).json({ success: 'Successfully posted image!' })

  } catch (error) {
    console.log(error)
  }
}

exports.update = async (req, res) => {
  try {
    await Image.update(req.params.imageid, req.body);
    res.status(201).json({ success: 'Successfully updated Image!' })

  } catch (error) {
    console.log(error)
  }
}

exports.remove = async (req, res) => {
  try {
    await Image.delete(req.params.imageid);
    res.status(201).json({ success: 'Successfully deleted Image!' });

  } catch (error) {
    console.log(error)
  }  
}