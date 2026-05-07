
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'svwgtz77',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2025-05-06',
});

async function main() {
  const posts = await client.fetch(`*[_type == "post" && title match "Les meilleures draisiennes électriques pour adultes à moins de 500 €"]{title, content}`);
  posts.forEach(post => {
    if (post.content) {
        console.log(`--- ${post.title} ---`);
        // Find "Voir le prix" and show context
        const index = post.content.indexOf('Voir le prix');
        if (index !== -1) {
            console.log(post.content.substring(index - 100, index + 200));
        }
    }
  });
}

main().catch(console.error);
