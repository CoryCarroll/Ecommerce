const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Location.findbyPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoryData) {
      res.status(404).json({ message: 'This category has no id.'});
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err.message);
  }

});

router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } 
  catch (err) {
    res.status(400).json(err.message);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Location.destroy({
      where: {
        id: req.params.id 
      }
    });

    if (!categoryData) {
      res.status(400).json({ message: 'This category has no id.'});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

module.exports = router;
