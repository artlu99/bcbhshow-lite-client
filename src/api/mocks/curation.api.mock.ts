import { CurationResponse, VotesResponse } from '@app/api/curation.api';
import { httpApiMock } from '@app/api/mocks/http.api.mock';

const mockVotesResponse: VotesResponse = {
  results: [
    { votedFid: 273147, cnt: 6, action: 'upvote' },
    { votedFid: 6546, cnt: 5, action: 'upvote' },
    { votedFid: 397815, cnt: 2, action: 'upvote' },
    { votedFid: 15850, cnt: 2, action: 'upvote' },
    { votedFid: 6596, cnt: 2, action: 'upvote' },
    { votedFid: 680, cnt: 2, action: 'upvote' },
    { votedFid: 99, cnt: 5, action: 'downvote' },
    { votedFid: 6546, cnt: 2, action: 'downvote' },
  ],
};

const mockCurationResponse: CurationResponse = {
  results: [
    {
      timestamp: 1718241210340,
      voterFid: 6546,
      votedFid: 327623,
      hash: '0x413f4d82d195ef13d7d672df39267acc1e4ef6b3',
      action: 'downvote',
    },
    {
      timestamp: 1718241198379,
      voterFid: 6546,
      votedFid: 15850,
      hash: '0x9442b4058fe447a5e13178ee9567d7463d8861dd',
      action: 'upvote',
    },
    {
      timestamp: 1718241171791,
      voterFid: 6546,
      votedFid: 15850,
      hash: '0xc29d9ae650ff4db4f3a982ef86a9fd56e360cb3e',
      action: 'downvote',
    },
    {
      timestamp: 1718241144829,
      voterFid: 6546,
      votedFid: 13387,
      hash: '0x2964e889d1f01d4e57479f74cf8bcc3ed811909e',
      action: 'upvote',
    },
  ],
};
httpApiMock
  .onGet('getCuration')
  .reply(200, mockVotesResponse)
  .onPost('getCuration')
  .reply(200, mockCurationResponse)
  .onPut('putCuration')
  .reply(200, { message: 'fid 6546 voted DOWN on FID 15850' });
