import { FeedObject } from '@app/api/feed-types';
import { RawAPIResponse, transformRawAPIResponse } from '@app/api/mocks/cronFeed.api.mock';
import { httpApiMock } from '@app/api/mocks/http.api.mock';

const rawFollowingFeed: RawAPIResponse = {
  casts: [
    {
      author: {
        active_status: 'inactive',
        custody_address: '0x7f9a6992a54dc2f23f1105921715bd61811e5b71',
        display_name: 'Justin Hunter',
        fid: 4823,
        follower_count: 26787,
        following_count: 924,
        object: 'user',
        pfp_url:
          'https://i.seadn.io/gae/lhGgt7yK1JiBVYz_HBxcAmYLRtP03aw5xKX4FgmFT9Ai7kLD5egzlLvb0lkuRNl28shtjr07DC8IHzLUkTqlWUMndUzC9R5_MSxH3g?w=500&auto=format',
        power_badge: true,
        profile: {
          bio: {
            mentioned_profiles: [],
            text: 'Writer. Building @pinatacloud. Tinkering with a Farcaster native alternative to GoodReads: https://readcast.xyz \\ https://polluterofminds.com',
          },
        },
        username: 'polluterofminds',
        verifications: ['0xcdcdc174901b12e87cc82471a2a2bd6181c89392', '0x1612c6dff0eb5811108b709a30d8150495ce9cc5'],
        verified_addresses: {
          eth_addresses: ['0xcdcdc174901b12e87cc82471a2a2bd6181c89392', '0x1612c6dff0eb5811108b709a30d8150495ce9cc5'],
          sol_addresses: [],
        },
      },
      embeds: [
        {
          url: 'https://x.com/matthew_d_green/status/1789687898863792453?s=46',
        },
      ],
      hash: '0xddc971b2ae7188c739627cc3ff519f1a5ce0ffde',
      mentioned_profiles: [],
      object: 'cast',
      parent_author: {
        fid: null,
      },
      parent_hash: null,
      parent_url: 'https://warpcast.com/~/channel/privacy',
      reactions: {
        likes: [
          {
            fid: 2777,
            fname: 'alexbruno.eth',
          },
          {
            fid: 533877,
            fname: 'bura7501',
          },
          {
            fid: 288646,
            fname: 'sebek',
          },
          {
            fid: 5491,
            fname: 'pauldowman.eth',
          },
          {
            fid: 99,
            fname: 'jessepollak',
          },
        ],
        likes_count: 7,
        recasts: [
          {
            fid: 533877,
            fname: 'bura7501',
          },
          {
            fid: 5016,
            fname: 'stas',
          },
        ],
        recasts_count: 2,
      },
      replies: {
        count: 2,
      },
      root_parent_url: 'https://warpcast.com/~/channel/privacy',
      text: 'Telegram has never made much sense to me. But I’ve largely resigned myself to having lost the battle in crypto and am forced to use it daily. https://x.com/matthew_d_green/status/1789687898863792453?s=46',
      thread_hash: '0xddc971b2ae7188c739627cc3ff519f1a5ce0ffde',
      timestamp: '2024-05-13T13:30:18.000Z',
    },
  ],
};
const mockFollowingFeed: FeedObject = transformRawAPIResponse(rawFollowingFeed);
httpApiMock.onPost('getCastsByFollowing').reply(200, mockFollowingFeed);
