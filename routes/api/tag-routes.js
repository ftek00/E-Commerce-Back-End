const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  try {
    const tags = await Tag.findAll({ include: Product });
    res.json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const tag = await Tag.findByPk(id, { include: Product });
    if (!tag) {
      res.status(404).json({ error: "Tag not found" });
    } else {
      res.json(tag);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", async (req, res) => {
  const { name } = req.body;
  try {
    const newTag = await Tag.create({ name });
    res.status(201).json(newTag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create tag" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const tag = await Tag.findByPk(id);
    if (!tag) {
      res.status(404).json({ error: "Tag not found" });
    } else {
      await tag.update({ name });
      res.json(tag);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update tag" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const tag = await Tag.findByPk(id);
    if (!tag) {
      res.status(404).json({ error: "Tag not found" });
    } else {
      await tag.destroy();
      res.status(204).end();
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete tag" });
  }
});

module.exports = router;
