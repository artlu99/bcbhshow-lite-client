import type { Env } from "../common";
import type { FeedObject } from "../shared/feed-types";
import { sendPosthogChannelId } from "../shared/posthog";

export const onRequestPost: PagesFunction<Env> = async (context) => {
	const { request } = context;
	const js = (await request.json()) as {
		channelId: string;
		pageSize: number;
		pageToken?: string;
	};
	const { channelId, pageSize, pageToken } = js;

	const neynarApiKey = context.env.NEYNAR_API_KEY;

	const paginationParam = pageToken ? `&cursor=${pageToken}` : "";
	const endpoint = `https://api.neynar.com/v2/farcaster/feed?feed_type=filter&filter_type=channel_id&channel_id=${channelId}&limit=${pageSize}${paginationParam}`;
	const res = await fetch(endpoint, {
		method: "GET",
		headers: {
			accept: "application/json",
			"x-api_key": neynarApiKey,
		},
	});
	if (!res.ok) {
		const errorDetails = await res.json();
		console.error(
			"Neynar API Error:",
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
		throw new Error(
			`Neynar API Error: ${res.status} ${res.statusText} - ${JSON.stringify(errorDetails)}`,
		);
	}

	await sendPosthogChannelId(context.env, "getCronFeed", channelId);

	const cronFeedResponse = (await res.json()) as FeedObject;
	return new Response(JSON.stringify(cronFeedResponse));
};
