const connectToDatabase = require("./mongoclient"); 
const { faker } = require("@faker-js/faker");
require("dotenv").config();

async function seedRecipes(count = 100) {
  const db = await connectToDatabase();
  const posts = db.collection("posts");

  const fakeRecipes = [];

  for (let i = 0; i < count; i++) {
    fakeRecipes.push({
      title: faker.food.dish(),
      ingredients: faker.lorem.sentences(2),
      steps: faker.lorem.paragraphs(3),
      prepTime: faker.number.int({ min: 5, max: 90 }),
      public: true,
      userId: "example@test.com",//faker.internet.email(),
      createdAt: new Date(),
    });
  }

  try {
    await posts.insertMany(fakeRecipes);
    console.log(`✅ Successfully inserted ${count} fake recipes.`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error inserting fake recipes:", err);
    process.exit(1);
  }
}

async function clearDatabase() {
    try {
      const db = await connectToDatabase();
      const collections = await db.collections();
  
      for (const collection of collections) {
        const name = collection.collectionName;
        await collection.deleteMany({});
        console.log(`🧹 Cleared collection: ${name}`);
      }
  
      console.log("✅ Database cleared.");
      process.exit(0);
    } catch (err) {
      console.error("❌ Error clearing database:", err);
      process.exit(1);
    }
  }
  
//clearDatabase();

seedRecipes(3);
