import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'svwgtz77',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2025-05-06'
});

async function fetchPosts() {
  try {
    const posts = await client.fetch('*[_type == "post"]{title, "slug": slug.current}');
    console.log(JSON.stringify(posts, null, 2));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

fetchPosts();
