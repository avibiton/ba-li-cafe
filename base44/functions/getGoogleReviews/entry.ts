import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const apiKey = Deno.env.get("GOOGLE_PLACES_API_KEY");

    // Step 1: Find the place by text search
    const query = "BA-LI Cafe 4433 Stirling Rd Hollywood FL";
    const findUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(query)}&inputtype=textquery&fields=place_id,name,rating,user_ratings_total&key=${apiKey}`;
    const findRes = await fetch(findUrl);
    const findData = await findRes.json();

    if (!findData.candidates || findData.candidates.length === 0) {
      return Response.json({ error: 'Place not found' }, { status: 404 });
    }

    const place = findData.candidates[0];
    const placeId = place.place_id;

    // Step 2: Get place details with reviews
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews,formatted_address&key=${apiKey}`;
    const detailsRes = await fetch(detailsUrl);
    const detailsData = await detailsRes.json();

    const result = detailsData.result || {};
    const reviews = (result.reviews || []).map((r) => ({
      author: r.author_name,
      rating: r.rating,
      text: r.text,
      time: r.time,
      profile_photo: r.profile_photo_url,
      relative_time: r.relative_time_description,
    }));

    return Response.json({
      name: result.name || place.name,
      rating: result.rating || place.rating,
      total_reviews: result.user_ratings_total || place.user_ratings_total,
      address: result.formatted_address,
      reviews,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});