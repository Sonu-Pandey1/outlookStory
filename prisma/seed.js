import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create 5 categories (if they don't already exist)
  const categories = [];
  for (let i = 1; i <= 5; i++) {
    const category = await prisma.category.upsert({
      where: { slug: `category${i}` },
      update: {},
      create: {
        slug: `category${i}`,
        title: `Category ${i}`,
        img: `https://via.placeholder.com/150?text=Category+${i}`,
      },
    });
    categories.push(category);
  }
  console.log(`${categories.length} categories created or connected.`);

  // Create 5 users with unique details
  const users = [];
  for (let i = 1; i <= 5; i++) {
    const user = await prisma.user.upsert({
      where: { userId: `user${i}` }, // Using userId to check if the user already exists
      update: {}, // No update needed if the user already exists
      create: {
        userId: `user${i}`,
        email: `user${i}@example.com`,
        name: `User ${i}`,
        image: `https://randomuser.me/api/portraits/men/${i}.jpg`,
      },
    });
    users.push(user);
  }
  console.log(`${users.length} users created.`);

  // Create 5 posts for each user
  const posts = [];
  for (let i = 0; i < users.length; i++) {
    for (let j = 1; j <= 5; j++) {
      const post = await prisma.post.create({
        data: {
          slug: `post-${i + 1}-${j}`,
          title: `Post ${j} by ${users[i].name}`,
          desc: `This is the description for Post ${j} by ${users[i].name}`,
          userId: users[i].userId, // userId links to the user's userId
          catSlug: categories[j % categories.length].slug, // Assign a category to the post
        },
      });
      posts.push(post);
    }
  }
  console.log("Posts created.");

  // Create likes for posts
  await prisma.like.createMany({
    data: [
      { userId: users[0].userId, postId: posts[0].id },
      { userId: users[1].userId, postId: posts[1].id },
      { userId: users[2].userId, postId: posts[2].id },
      { userId: users[3].userId, postId: posts[3].id },
      { userId: users[4].userId, postId: posts[4].id },
    ],
  });
  console.log("Likes created.");

  // Create comments for posts
  const comments = [];
  for (let i = 0; i < posts.length; i++) {
    const comment = await prisma.comment.create({
      data: {
        desc: `Comment on Post ${posts[i].id} by ${users[(i + 1) % 5].name}`,
        userId: users[(i + 1) % 5].userId, // Use userId here
        postSlug: posts[i].slug,
      },
    });
    comments.push(comment);
  }
  console.log("Comments created.");

  // Create saved posts
  await prisma.savedPosts.createMany({
    data: [
      { userId: users[0].userId, postId: posts[1].id },
      { userId: users[1].userId, postId: posts[2].id },
      { userId: users[2].userId, postId: posts[3].id },
      { userId: users[3].userId, postId: posts[4].id },
      { userId: users[4].userId, postId: posts[0].id },
    ],
  });
  console.log("Saved posts created.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
