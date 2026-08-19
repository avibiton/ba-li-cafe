import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { accessToken } = await base44.asServiceRole.connectors.getConnection("instagram");

    // Get the connected user's ID and username
    const meRes = await fetch(
      `https://graph.instagram.com/me?fields=id,username&access_token=${accessToken}`
    );
    const me = await meRes.json();

    if (!me.id) {
      return Response.json({ error: "Unable to resolve Instagram account" }, { status: 500 });
    }

    // Fetch recent media
    const mediaRes = await fetch(
      `https://graph.instagram.com/${me.id}/media?fields=id,caption,media_url,permalink,media_type,thumbnail_url,timestamp&limit=12&access_token=${accessToken}`
    );
    const mediaData = await mediaRes.json();

    return Response.json({
      username: me.username,
      profile_url: `https://www.instagram.com/${me.username}/`,
      media: mediaData.data || [],
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});