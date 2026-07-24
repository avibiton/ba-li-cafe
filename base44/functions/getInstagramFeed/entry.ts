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

    const posts = media.data.map((p) => ({
      id: p.id,
      caption: p.caption || '',
      media_type: p.media_type,
      image_url: p.media_type === 'VIDEO' ? p.thumbnail_url : p.media_url,
      permalink: p.permalink,
      timestamp: p.timestamp,
    })).filter((p) => p.image_url);

    return Response.json({ username: me.username, posts });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});