
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
const https = require('https');
const http = require('http');
const url = require('url');

exports.handler = async function(event, context) {
  // Get the URL from the query parameter
  const targetUrl = event.queryStringParameters.url;
  
  if (!targetUrl) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'URL parameter is required' })
    };
  }
  
  try {
    // Parse the URL to determine if it's HTTP or HTTPS
    const parsedUrl = url.parse(targetUrl);
    const protocol = parsedUrl.protocol === 'https:' ? https : http;
    
    // Make a request to the target URL
    const response = await new Promise((resolve, reject) => {
      const req = protocol.get(targetUrl, (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body
          });
        });
      });
      
      req.on('error', (error) => {
        reject(error);
      });
      
      req.end();
    });
    
    // Return the response with appropriate headers
    return {
      statusCode: response.statusCode,
      headers: {
        'Content-Type': response.headers['content-type'] || 'text/html',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: response.body
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}
