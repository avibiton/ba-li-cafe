import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

const GRAPH = 'https://graph.instagram.com';
const MEDIA_FIELDS = 'id,caption,media_url,permalink,media_type,thumbnail_url,timestamp';
const PAGE_SIZE = 25;
const MAX_PAGES = 2; // up to ~50 most recent posts & reels

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { accessToken } = await base44.asServiceRole.connectors.getConnection("instagram");

    // Resolve the connected account
    const meRes = await fetch(`${GRAPH}/me?fields=id,username&access_token=${accessToken}`);
    const me = await meRes.json();
    if (!me.id) {
      return Response.json({ error: "Unable to resolve Instagram account" }, { status: 500 });
    }

    // Page through recent media (posts + reels)
    let url = `${GRAPH}/${me.id}/media?fields=${MEDIA_FIELDS}&limit=${PAGE_SIZE}&access_token=${accessToken}`;
    const all = [];
    for (let page = 0; page < MAX_PAGES && url; page++) {
      const res = await fetch(url);
      const data = await res.json();
      if (data.error) break;
      for (const m of data.data || []) {
        // Carousel albums carry no direct media_url — fetch first child for the image
        if (m.media_type === 'CAROUSEL_ALBUM' && !m.media_url && !m.thumbnail_url) {
          try {
            const childRes = await fetch(
              `${GRAPH}/${m.id}/children?fields=media_url,media_type,thumbnail_url&access_token=${accessToken}`
            );
            const childData = await childRes.json();
            const first = (childData.data || []).find((c) => c.media_url || c.thumbnail_url);
            if (first) {
              m.media_url = first.media_url;
              m.thumbnail_url = first.thumbnail_url;
              m.media_type = first.media_type || m.media_type;
            }
          } catch { /* keep original */ }
        }
        all.push(m);
      }
      url = data.paging?.next || null;
    }

    return Response.json({
      username: me.username,
      profile_url: `https://www.instagram.com/${me.username}/`,
      media: all,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});