
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  try {
    const url = event.queryStringParameters.url;
    
    if (!url) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'URL parameter is required' })
      };
    }

    // Decode and validate URL
    const decodedUrl = decodeURIComponent(url);
    let targetUrl;
    
    try {
      targetUrl = new URL(decodedUrl);
    } catch (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid URL format' })
      };
    }

    // Fetch the target URL
    const response = await fetch(targetUrl.toString(), {
      method: event.httpMethod,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        ...event.headers
      },
      body: event.body
    });

    // Get response data
    const contentType = response.headers.get('content-type') || '';
    let responseBody;
    
    if (contentType.includes('application/json')) {
      responseBody = await response.json();
      return {
        statusCode: response.status,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(responseBody)
      };
    } else {
      responseBody = await response.text();
      return {
        statusCode: response.status,
        headers: { 'Content-Type': contentType },
        body: responseBody
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error: ' + error.message })
    };
  }
};
