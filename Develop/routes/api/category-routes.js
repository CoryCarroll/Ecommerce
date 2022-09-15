const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
try {
  const productData = await Location.findAll();
  res.status(200).json(productData);
} catch (err) {
  res.status(500).json(err);
}

});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const categoryData = await Location.findbyPk(req.params.id, {
      include: [{ model: Category, through: id, as: 'name'}]
    });
    if (!categoryData) {
      res.status(404).json({ message: 'This category has no id.'});
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
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
    res.status(400).json(err);
  }
});

module.exports = router;
