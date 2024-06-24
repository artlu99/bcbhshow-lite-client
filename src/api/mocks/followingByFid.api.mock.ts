import { FollowingByFidResponseSchema } from '@app/api/farquest-types';
import { httpApiMock } from '@app/api/mocks/http.api.mock';
import { MAX_PAGESIZE } from '@app/constants/farQuestPagination';

const fid = import.meta.env.REACT_APP_DEFAULT_FID;
const deadCursor = '1718629859000-667035eb4212bc9241a31fc2';

const mockResult: FollowingByFidResponseSchema = {
  result: {
    users: [
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
      {
        fid: '690300',
        followingCount: 70,
        followerCount: 1,
        pfp: {
          url: '',
          verified: false,
        },
        bio: {
          text: '',
          mentions: [],
        },
        external: false,
        custodyAddress: '0xa499c64acea5014e13dd45468e59a589815adacf',
        connectedAddress: null,
        allConnectedAddresses: {
          ethereum: [],
          solana: [],
        },
        username: 'lillyyy',
        registeredAt: 1718630887000,
      },
      {
        fid: '690313',
        followingCount: 88,
        followerCount: 2,
        pfp: {
          url: 'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/c2024fe8-84e6-4703-b803-71af2d2eb700/rectcrop3',
          verified: false,
        },
        bio: {
          text: 'Lifes a party, enjoy it',
          mentions: [],
        },
        external: false,
        custodyAddress: '0x600d676ba7fbedc65aebcd2705d560becbefa5c6',
        connectedAddress: null,
        allConnectedAddresses: {
          ethereum: [],
          solana: [],
        },
        username: 'curetixpierceri',
        displayName: 'CuretixPierceri',
        registeredAt: 1718631099000,
      },
      {
        fid: '534532',
        followingCount: 5675,
        followerCount: 784,
        pfp: {
          url: 'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/1e4a7701-b690-4a6b-dd37-07a1efe78e00/rectcrop3',
          verified: false,
        },
        bio: {
          text: 'Nothing',
          mentions: [],
        },
        external: false,
        custodyAddress: '0xc301984ba4d7aa4cd29e009dc2aa50a9ab4f3758',
        connectedAddress: '0xf717369e431f8adcfd33e43c3a3e5839b5d4df4d',
        allConnectedAddresses: {
          ethereum: ['0xf717369e431f8adcfd33e43c3a3e5839b5d4df4d'],
          solana: [],
        },
        displayName: 'Hoahong',
        username: 'hoahong',
        registeredAt: 1715607361000,
      },
      {
        fid: '690283',
        followingCount: 66,
        followerCount: 0,
        pfp: {
          url: 'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/2990d918-f6d9-42c2-2e4f-246a3ae77800/rectcrop3',
          verified: false,
        },
        bio: {
          text: 'University student majoring in international relations, supporting Black Lives Matter and global equity.',
          mentions: [],
        },
        external: false,
        custodyAddress: '0x6e5a2f12ac3b8e0ea9eb2063edd9ad4011c101e2',
        connectedAddress: null,
        allConnectedAddresses: {
          ethereum: [],
          solana: [],
        },
        username: 'suesmatctitoice',
        displayName: 'SuesmatcTitoice',
        registeredAt: 1718630577000,
      },
      {
        fid: '690273',
        followingCount: 76,
        followerCount: 0,
        pfp: {
          url: 'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/e9e70dac-a52a-4d21-2b5c-bd0427026e00/rectcrop3',
          verified: false,
        },
        bio: {
          text: 'International relations student at university, committed to understanding global politics.',
          mentions: [],
        },
        external: false,
        custodyAddress: '0x145cf7ddd9204e69f147b1ee3c2d739758d21be6',
        connectedAddress: null,
        allConnectedAddresses: {
          ethereum: [],
          solana: [],
        },
        username: 'bergstrpierceri',
        displayName: 'BergstrPierceri',
        registeredAt: 1718630487000,
      },
      {
        fid: '690268',
        followingCount: 70,
        followerCount: 3,
        pfp: {
          url: 'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/51bd34df-1325-4b11-321a-ed2ffb798c00/rectcrop3',
          verified: false,
        },
        bio: {
          text: 'Manchester United die hard, part time degen, part time father',
          mentions: [],
        },
        external: false,
        custodyAddress: '0x39664a7bb1c0ad3ddb64b9e8adddeb76ca29bdb2',
        connectedAddress: null,
        allConnectedAddresses: {
          ethereum: [],
          solana: [],
        },
        username: 'zayn19',
        displayName: 'Zayn',
        registeredAt: 1718630427000,
      },
      {
        fid: '690271',
        followingCount: 73,
        followerCount: 1,
        pfp: {
          url: 'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/ff834b7b-a217-4700-0cf8-90e7adeddd00/rectcrop3',
          verified: false,
        },
        bio: {
          text: 'market survivor since 2017',
          mentions: [],
        },
        external: false,
        custodyAddress: '0x6dff22322fea831b335997c68b2b83d9ff427e48',
        connectedAddress: null,
        allConnectedAddresses: {
          ethereum: [],
          solana: [],
        },
        username: 'patrick87',
        displayName: 'Patrick87',
        registeredAt: 1718630445000,
      },
      {
        fid: '690262',
        followingCount: 72,
        followerCount: 3,
        pfp: {
          url: 'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/1628055e-ce94-4551-c82c-b865e8dda100/rectcrop3',
          verified: false,
        },
        bio: {
          text: 'Sunbathing and poop tasting champion.',
          mentions: [],
        },
        external: false,
        custodyAddress: '0xa54d1fdccb620e0d98367b4a4a2211d554483628',
        connectedAddress: null,
        allConnectedAddresses: {
          ethereum: [],
          solana: [],
        },
        username: 'nancytekariture',
        displayName: 'NancyteKariture',
        registeredAt: 1718630307000,
      },
      {
        fid: '690238',
        followingCount: 71,
        followerCount: 3,
        pfp: {
          url: 'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/62787205-b9a7-430d-bff1-8b727167a600/rectcrop3',
          verified: false,
        },
        bio: {
          text: '',
          mentions: [],
        },
        external: false,
        custodyAddress: '0x4dcc7c8e3c2895c67eed229796c908f230016180',
        connectedAddress: null,
        allConnectedAddresses: {
          ethereum: [],
          solana: [],
        },
        username: 'jsjsjsjssj',
        displayName: 'Hdhdhdjsjdjd',
        registeredAt: 1718629871000,
      },
      {
        fid: '690232',
        followingCount: 66,
        followerCount: 3,
        pfp: {
          url: 'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/07281b27-75d9-4238-80a6-a703ca2b5600/rectcrop3',
          verified: false,
        },
        bio: {
          text: '5252',
          mentions: [],
        },
        external: false,
        custodyAddress: '0xf687f4a0ef98e3cd5180b66cfb3f5739e3bff6b2',
        connectedAddress: null,
        allConnectedAddresses: {
          ethereum: [],
          solana: [],
        },
        username: 'olivermunk',
        displayName: 'olivermunk52',
        registeredAt: 1718629829000,
      },
    ],
    next: deadCursor,
  },
  source: 'v2',
};

httpApiMock
  .onPost('getFollowingByFid', {
    fid,
    limit: MAX_PAGESIZE,
    cursor: deadCursor,
  })
  .reply(200, {
    result: {
      users: [3, 99, 6546],
    },
  })
  .onPost('getFollowingByFid')
  .reply(200, mockResult);
