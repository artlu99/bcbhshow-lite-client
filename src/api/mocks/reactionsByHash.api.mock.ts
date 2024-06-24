import { ReactionsByHashResponseSchema } from '@app/api/farquest-types';
import { httpApiMock } from '@app/api/mocks/http.api.mock';

const mockResult: ReactionsByHashResponseSchema = {
  result: {
    likes: [
      {
        fid: '99',
        followingCount: 1367,
        followerCount: 383334,
        pfp: {
          url: 'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/1013b0f6-1bf4-4f4e-15fb-34be06fede00/original',
          verified: false,
        },
        bio: {
          text: '@base builder #001; onchain cities w/ OAK & city3',
          mentions: ['base'],
        },
        external: false,
        custodyAddress: '0x4ce34af3378a00c640125e4dbf4c9e64dff4c93b',
        connectedAddress: '0x849151d7d0bf1f34b70d5cad5149d28cc2308bf1',
        allConnectedAddresses: {
          ethereum: [
            '0x849151d7d0bf1f34b70d5cad5149d28cc2308bf1',
            '0xe73f9c181b571cac2bf3173634d04a9921b7ffcf',
            '0x6e0d9c6dd8a08509bb625caa35dc61a991406f62',
          ],
          solana: [],
        },
        username: 'jessepollak',
        displayName: 'Jesse Pollak 🔵',
        registeredAt: 1693473166873,
      },
    ],
    next: '1718633063000-667042714212bc9241082854',
  },
  source: 'v2',
};
httpApiMock.onPost('getReactionsByHash').reply(200, mockResult);
