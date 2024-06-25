import { FeedObject } from '@app/api/feed-types';
import { RawAPIResponse, transformRawAPIResponse } from '@app/api/mocks/cronFeed.api.mock';
import { httpApiMock } from '@app/api/mocks/http.api.mock';

const rawForYouFeed: RawAPIResponse = {
  casts: [
    {
      object: 'cast',
      hash: '0x14be3ad800e885d545671acb647123d70bd8b182',
      thread_hash: '0x14be3ad800e885d545671acb647123d70bd8b182',
      parent_hash: null,
      parent_url: 'https://warpcast.com/~/channel/six',
      root_parent_url: 'https://warpcast.com/~/channel/six',
      parent_author: {
        fid: null,
      },
      author: {
        object: 'user',
        fid: 680,
        custody_address: '0x0b28a373fc8d92669aefb420499e74ce2dd5d356',
        username: 'woj.eth',
        display_name: '​woj',
        pfp_url:
          'https://peach-changing-limpet-80.mypinata.cloud/ipfs/QmZenqRfBERmodRVUHhLaYvYVsRasihVcMY2gqUP2tX7t2?filename=profile_picture.png',
        profile: {
          bio: {
            text: 'customer support @supercast\n\ntrying to sound smart /doingnumbers',
          },
        },
        follower_count: 155270,
        following_count: 982,
        verifications: ['0xf417ace7b13c0ef4fcb5548390a450a4b75d3eb3'],
        verified_addresses: {
          eth_addresses: ['0xf417ace7b13c0ef4fcb5548390a450a4b75d3eb3'],
          sol_addresses: ['9hrZunMWouN6AtFp4Hoi3e4yWkVT32ZyfsQVqkmqLAft'],
        },
        active_status: 'inactive',
        power_badge: true,
        viewer_context: {
          following: true,
          followed_by: false,
        },
      },
      text: 'threads algo absolutely cooked',
      timestamp: '2024-06-25T12:45:13.000Z',
      embeds: [
        {
          url: 'https://supercast.mypinata.cloud/ipfs/QmVXYY4ekyvGKi4Kem6iTUEc1xhpiVoArHeXx7XUnEvMhe?filename=IMG_2551.png',
        },
      ],
      reactions: {
        likes_count: 22,
        recasts_count: 0,
        likes: [
          {
            fid: 4167,
            fname: 'nounishprof',
          },
          {
            fid: 648638,
            fname: 'fac12344321666',
          },
          {
            fid: 530854,
            fname: 'javahed',
          },
          {
            fid: 380246,
            fname: 'filimonovaver',
          },
          {
            fid: 697932,
            fname: 'illeks',
          },
        ],
        recasts: [],
      },
      replies: {
        count: 7,
      },
      channel: {
        object: 'channel_dehydrated',
        id: 'six',
        name: 'six',
        image_url: 'https://i.imgur.com/eLsRTEP.jpg',
      },
      mentioned_profiles: [],
      viewer_context: {
        liked: false,
        recasted: false,
      },
    },
  ],
};
const mockForYouFeed: FeedObject = transformRawAPIResponse(rawForYouFeed);
httpApiMock.onPost('getForYouFeed').reply(200, mockForYouFeed);
