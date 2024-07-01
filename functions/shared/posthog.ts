import { Env } from '../common';

const sendPosthogEvent = async (env: Env, event: string, distinct_id: string) => {
  const url = env.REACT_APP_PUBLIC_POSTHOG_HOST + '/capture/';
  const api_key = env.REACT_APP_PUBLIC_POSTHOG_KEY;

  const timestamp = new Date().toISOString();
  const headers = { 'Content-Type': 'application/json' };
  const payload = {
    api_key,
    distinct_id,
    event,
    timestamp,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload),
    });

    await response.json();
  } catch (e) {
    console.error('posthog error', e);
  }
};

export const sendPosthogFid = async (env: Env, event: string, fid: number) => {
  const distinct_id = fid === env.REACT_APP_DEFAULT_FID ? 'not signed in' : 'SIWN';
  await sendPosthogEvent(env, event, distinct_id);
};

export const sendPosthogChannelId = async (env: Env, event: string, channelId: string) => {
  const distinct_id = channelId;
  await sendPosthogEvent(env, event, distinct_id);
};
