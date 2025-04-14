const express = require("express");
const mongodb = require("mongodb");
const dotenv = require("dotenv");
const router = express.Router();

dotenv.config();

// Get Posts
router.get("/", async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

// Add Posts
router.post("/", async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    title: req.body.title,
    ingredients: req.body.ingredients,
    steps: req.body.steps,
    prepTime: req.body.prepTime ?? 0,
    public: req.body.public ?? false,
    userId: req.body.userId,
    createdAt: new Date(),
  });
  res.status(201).send();
});

// Delete Posts
router.delete("/:id", async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({ _id: new mongodb.ObjectId(req.params.id) });
  res.status(200).send();
});

// Get Posts of specific user
router.get("/user", async (req, res) => {
  const posts = await loadPostsCollection();
  const userId = req.query.userId;
  if (!userId) {
    return res.status(400).send({ message: "Missing userId query parameter" });
  }
  try {
    const userPosts = await posts.find({ userId: userId }).toArray();
    res.status(200).send(userPosts);
  } catch (err) {
    res.status(500).send({ message: "Error fetching user posts", error: err });
  }
});

// Get Random Public Posts with Custom Count
router.get("/random-public", async (req, res) => {
  const posts = await loadPostsCollection();
  const count = parseInt(req.query.count) || 5; // default to 5 if not provided
  try {
    const randomPublicPosts = await posts
      .aggregate([{ $match: { public: true } }, { $sample: { size: count } }])
      .toArray();
    res.status(200).send(randomPublicPosts);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error fetching random public posts", error: err });
  }
});

// Update Post
router.put("/:id", async (req, res) => {
  const posts = await loadPostsCollection();
  const postId = req.params.id;

  try {
    const result = await posts.updateOne(
      { _id: new mongodb.ObjectId(postId) },
      { $set: req.body }
    );
    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .send({ message: "Post not found or no changes made" });
    }
    res.status(200).send({ message: "Post updated successfully" });
  } catch (err) {
    res.status(500).send({ message: "Error updating post", error: err });
  }
});

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(
    process.env.MONGODB_CONNECT_STRING,
  );

  return client.db("recipe-storage").collection("posts");
}

module.exports = router;
