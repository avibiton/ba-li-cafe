import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const { accessToken } = await base44.asServiceRole.connectors.getConnection("google_analytics");

    // Step 1: Discover GA4 properties
    const adminRes = await fetch('https://analyticsadmin.googleapis.com/v1beta/accountSummaries', {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });
    const adminData = await adminRes.json();

    if (!adminData.accountSummaries || adminData.accountSummaries.length === 0) {
      return Response.json({ error: 'No GA4 accounts found. Make sure your GA4 property is set up.' }, { status: 404 });
    }

    // Find the first GA4 property
    let propertyId = null;
    let propertyName = null;
    for (const account of adminData.accountSummaries) {
      if (account.propertySummaries && account.propertySummaries.length > 0) {
        propertyId = account.propertySummaries[0].property.replace('properties/', '');
        propertyName = account.propertySummaries[0].displayName;
        break;
      }
    }

    if (!propertyId) {
      return Response.json({ error: 'No GA4 properties found in your account.' }, { status: 404 });
    }

    const dataApiUrl = `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`;
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    };

    // Report 1: Overall traffic metrics (last 30 days)
    const trafficRes = await fetch(dataApiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        dateRanges: [{ startDate: '30daysAgo', endDate: 'yesterday' }],
        metrics: [
          { name: 'sessions' },
          { name: 'totalUsers' },
          { name: 'screenPageViews' },
          { name: 'averageSessionDuration' },
          { name: 'bounceRate' },
          { name: 'screenPageViewsPerSession' }
        ]
      })
    });
    const trafficData = await trafficRes.json();

    // Report 2: Top pages by page views
    const pagesRes = await fetch(dataApiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        dateRanges: [{ startDate: '30daysAgo', endDate: 'yesterday' }],
        metrics: [
          { name: 'screenPageViews' },
          { name: 'totalUsers' },
          { name: 'averageSessionDuration' }
        ],
        dimensions: [{ name: 'pagePath' }, { name: 'pageTitle' }],
        orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
        limit: 10
      })
    });
    const pagesData = await pagesRes.json();

    // Report 3: Traffic sources
    const sourceRes = await fetch(dataApiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        dateRanges: [{ startDate: '30daysAgo', endDate: 'yesterday' }],
        metrics: [{ name: 'sessions' }, { name: 'totalUsers' }],
        dimensions: [{ name: 'sessionSource' }],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: 10
      })
    });
    const sourceData = await sourceRes.json();

    // Report 4: Daily traffic trend
    const trendRes = await fetch(dataApiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        dateRanges: [{ startDate: '30daysAgo', endDate: 'yesterday' }],
        metrics: [{ name: 'sessions' }, { name: 'totalUsers' }, { name: 'screenPageViews' }],
        dimensions: [{ name: 'date' }],
        orderBys: [{ dimension: { dimensionName: 'date' } }]
      })
    });
    const trendData = await trendRes.json();

    // Helper to extract metric values
    const extractMetrics = (data) => {
      const headers = (data.metricHeaders || []).map(h => h.name);
      const row = data.rows?.[0]?.metricValues || [];
      const result = {};
      headers.forEach((h, i) => {
        result[h] = row[i]?.value || '0';
      });
      return result;
    };

    return Response.json({
      property: { id: propertyId, name: propertyName },
      dateRange: { start: '30 days ago', end: 'yesterday' },
      trafficSummary: extractMetrics(trafficData),
      topPages: (pagesData.rows || []).map(r => ({
        path: r.dimensionValues[0]?.value,
        title: r.dimensionValues[1]?.value,
        pageViews: r.metricValues[0]?.value,
        users: r.metricValues[1]?.value,
        avgTimeOnPage: r.metricValues[2]?.value
      })),
      topSources: (sourceData.rows || []).map(r => ({
        source: r.dimensionValues[0]?.value,
        sessions: r.metricValues[0]?.value,
        users: r.metricValues[1]?.value
      })),
      dailyTrend: (trendData.rows || []).map(r => ({
        date: r.dimensionValues[0]?.value,
        sessions: r.metricValues[0]?.value,
        users: r.metricValues[1]?.value,
        pageViews: r.metricValues[2]?.value
      }))
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});