
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 's28s3636', // Need to check the real project ID
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
});

async function main() {
  const posts = await client.fetch(`*[_type == "post"][0..2]{title, content}`);
  posts.forEach(post => {
    console.log(`--- ${post.title} ---`);
    console.log(post.content.substring(0, 500));
  });
}

main().catch(console.error);
