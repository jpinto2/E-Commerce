const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    // this was first route document i did. i got an error when i used await before Category.findall
    // troubleshooting it said await is only used in async functions so i left it out
    const category = Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = Category.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: Product }],
    });
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
  try {
    const category = Category.create(req.body);
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const category = Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const category = Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
