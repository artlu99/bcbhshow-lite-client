import type { Env } from '../common';
import type { FeedObject } from '../shared/feed-types';
import { sendPosthogChannelId } from '../shared/posthog';

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { request } = context;
    let js;
    try {
      const requestText = await request.text();
      console.log('Raw request body:', requestText);
      js = JSON.parse(requestText) as {
        channelId: string;
        pageSize: number;
        pageToken?: string;
      };
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError);
      return new Response('Invalid JSON in request body', { status: 400 });
    }

    const { channelId, pageSize, pageToken } = js;

    const neynarApiKey = context.env.NEYNAR_API_KEY;

    const paginationParam = pageToken ? `&cursor=${pageToken}` : '';
    const endpoint = `https://api.neynar.com/v2/farcaster/feed?feed_type=filter&filter_type=channel_id&channel_id=${channelId}&limit=${pageSize}${paginationParam}`;

    console.log('Making request to:', endpoint);
    console.log('Neynar API Key:', neynarApiKey);

    const res = await fetch(endpoint, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-api_key': neynarApiKey,
      },
    });

    // Log the raw response for debugging
    const rawResponse = await res.text();
    console.log('Raw API Response:', rawResponse);

    if (!res.ok) {
      try {
        const errorDetails = JSON.parse(rawResponse);
        console.error(
          'Neynar API Error:',
          JSON.stringify(
            {
              status: res.status,
              statusText: res.statusText,
              endpoint,
              errorDetails,
              requestBody: js,
            },
            null,
            2,
          ),
        );
        return new Response(
          JSON.stringify({
            error: `Neynar API Error: ${res.status} ${res.statusText}`,
            details: errorDetails,
          }),
          { status: res.status },
        );
      } catch (parseError) {
        console.error('Failed to parse error response:', {
          rawResponse,
          parseError: parseError.message,
        });
        return new Response(
          JSON.stringify({
            error: `Neynar API Error: ${res.status} ${res.statusText}`,
            rawResponse,
          }),
          { status: res.status },
        );
      }
    }

    try {
      const cronFeedResponse = JSON.parse(rawResponse) as FeedObject;
      await sendPosthogChannelId(context.env, 'getCronFeed', channelId);
      return new Response(JSON.stringify(cronFeedResponse));
    } catch (parseError) {
      console.error('Failed to parse success response:', {
        rawResponse,
        parseError: parseError.message,
      });
      return new Response(
        JSON.stringify({
          error: 'Failed to parse Neynar API response',
          details: parseError.message,
          rawResponse,
        }),
        { status: 500 },
      );
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 500 },
    );
  }
};
