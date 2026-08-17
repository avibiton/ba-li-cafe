import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { accessToken } = await base44.asServiceRole.connectors.getConnection("instagram");

    // Get the user ID first
    const meRes = await fetch(`https://graph.instagram.com/me?fields=id,username&access_token=${accessToken}`);
    const me = await meRes.json();
    if (!me.id) return Response.json({ error: 'Failed to get Instagram user ID' }, { status: 500 });

    // Fetch recent media
    const mediaRes = await fetch(
      `https://graph.instagram.com/${me.id}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&limit=12&access_token=${accessToken}`
    );
    const media = await mediaRes.json();
    if (!media.data) return Response.json({ error: 'Failed to fetch media' }, { status: 500 });

    // For carousels, fetch the first child image so they aren't dropped
    const posts = await Promise.all(media.data.map(async (p) => {
      let image_url = p.media_type === 'VIDEO' ? p.thumbnail_url : p.media_url;

      if (p.media_type === 'CAROUSEL_ALBUM') {
        try {
          const childrenRes = await fetch(
            `https://graph.instagram.com/${p.id}/children?fields=media_type,media_url,thumbnail_url&access_token=${accessToken}`
          );
          const children = await childrenRes.json();
          const first = (children.data || []).find((c) => c.media_type === 'IMAGE' || c.media_type === 'VIDEO');
          if (first) image_url = first.media_type === 'VIDEO' ? first.thumbnail_url : first.media_url;
        } catch {
          // leave image_url undefined; will be filtered below
        }
      }

      return {
        id: p.id,
        caption: p.caption || '',
        media_type: p.media_type,
        image_url,
        permalink: p.permalink,
        timestamp: p.timestamp,
      };
    }));

    return Response.json({ username: me.username, posts: posts.filter((p) => p.image_url) });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});