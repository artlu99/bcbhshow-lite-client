import { httpApiMock } from '@app/api/mocks/http.api.mock';

httpApiMock.onGet('getBotOrNot').reply(200, {
  results: [
    { label: 'prolific', cnt: 0 },
    { label: '', cnt: 11 },
    { label: 'human cast machine', cnt: 12 },
    { label: 'good', cnt: 7 },
    { label: 'basic', cnt: 3 },
    { label: 'bot', cnt: 2 },
    { label: 'builder', cnt: 5 },
    { label: 'popular shitcaster', cnt: 4 },
  ],
});

httpApiMock.onPost('getBotOrNot').reply(200, {
  fids: [
    { fid: 1725, result: { label: 'prolific', summary: '/bot-or-not, moderators, experiments, projects' } },
    {
      fid: 6546,
      result: { label: 'human cast machine', summary: 'casts, $degen, beavchris, bcbhshow', farcaptcha: true },
    },
    {
      fid: 15850,
      result: { label: 'good', summary: 'spiritual,creator,humor,community,farcaster', farcaptcha: true },
    },
  ],
});
