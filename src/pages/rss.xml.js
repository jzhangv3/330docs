import rss from '@astrojs/rss';
import { SITE_BASE, SITE_DESCRIPTION, SITE_TITLE } from '@src/consts';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('content');
  const publishedPosts = posts.filter((post) => post.data.draft !== true && !post.id.endsWith('/_index'));

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: publishedPosts.map((post) => ({
      ...post.data,
      link: `${SITE_BASE}/${post.id}/`,
    })),
  });
}
