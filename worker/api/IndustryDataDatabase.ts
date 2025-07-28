export async function IndustryDataDatabaseHandler(req: Request): Promise<Response> {
  try {
    if (req.method !== 'GET') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    const url = new URL(req.url);
    const industry = url.searchParams.get('industry');
    if (!industry) {
      return new Response(JSON.stringify({ error: 'Industry parameter is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    const industryData = await getIndustryData(industry);
    if (!industryData) {
      return new Response(JSON.stringify({ error: 'Industry data not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    return new Response(JSON.stringify(industryData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function getIndustryData(industry: string): Promise<{ [key: string]: any } | null> {
  const database: { [key: string]: { [key: string]: any } } = {
    'tech': {
      keywords: ['software', 'engineering', 'development'],
      formats: ['modern', 'minimalist']
    },
    'finance': {
      keywords: ['finance', 'accounting', 'investment'],
      formats: ['professional', 'classic']
    }
    // Add more industry data as needed
  };
  return database[industry.toLowerCase()] || null;
}
