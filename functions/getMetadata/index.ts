const endpoint = 'https://unfurl.artlu.workers.dev/?u=';

export const onRequestPost: PagesFunction = async (context) => {
  const { request } = context;
  const js = (await request.json()) as { url: string };
  const { url } = js;

  try {
    const contentTypeFetch = await fetch(url, { method: 'HEAD' });
    const contentType = contentTypeFetch.headers.get('content-type');

    let content;
    if (contentType?.includes('text/html')) {
      const res = await unfurl(url);
      content = 'website';
      return new Response(JSON.stringify({ res, content }), { status: 200 });
    } else if (contentType?.includes('image')) {
      content = 'image';
      return new Response(JSON.stringify({ url, content }), { status: 200 });
    } else {
      content = 'null';
      return new Response(JSON.stringify({ url, content }), { status: 200 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: error }), { status: 500 });
  }
};

const unfurl = async (url: string) => {
  const res = await fetch(`${endpoint}${url}`);
  return res.json();
};
