import { httpApiMock } from '@app/api/mocks/http.api.mock';
import { UserFollowingChannelsObject } from '@app/api/warpcast-types';

const mockedFollowedChannels: UserFollowingChannelsObject = {
  result: {
    channels: [
      {
        id: 'micah',
        url: 'https://warpcast.com/~/channel/micah',
        name: 'Micah',
        description: 'Share your thoughts here. https://paragraph.xyz/@micah',
        imageUrl: 'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/45111d96-d390-456a-7b32-9f64edfaec00/rectcrop3',
        leadFid: 1520,
        createdAt: 1718143521,
        followerCount: 20,
        followedAt: 1718498313,
      },
      {
        id: 'indiemusic',
        url: 'https://warpcast.com/~/channel/indiemusic',
        name: 'sad lesbian indie',
        description: 'all things sad lesbian indie music',
        imageUrl: 'https://i.imgur.com/kDat2vC.jpeg',
        leadFid: 19793,
        createdAt: 1713376559,
        followerCount: 15,
        followedAt: 1718409734,
      },
      {
        id: 'greenjeff',
        url: 'https://warpcast.com/~/channel/greenjeff',
        name: 'greenjeff',
        description: 'Green Jeff Capital Group Incorporated Metaverse Fund LLC Foundation Inc.',
        imageUrl: 'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/8f588d70-5eb5-4e04-c2c9-e9035adae400/original',
        leadFid: 19793,
        createdAt: 1712795836,
        followerCount: 11,
        followedAt: 1718409694,
      },
      {
        id: 'toe-spacer',
        url: 'https://warpcast.com/~/channel/toe-spacer',
        name: 'toe spacer',
        description: '🦶sufficiently spaced toes🦶',
        imageUrl: 'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/5fce651a-8ff9-4acd-ab52-b792d19db400/original',
        leadFid: 12256,
        createdAt: 1718211061,
        followerCount: 535,
        followedAt: 1718285704,
      },
      {
        id: 'commitment',
        url: 'https://warpcast.com/~/channel/commitment',
        name: 'commitment',
        description:
          'a place to make public commitments to hold yourself accountable. casts must start with "I commit" or "My commitment is" to be shown in channel',
        imageUrl: 'https://i.imgur.com/HJuC4Ee.png',
        leadFid: 129,
        createdAt: 1715317616,
        followerCount: 12419,
        followedAt: 1718087120,
      },
    ],
  },
};
httpApiMock.onPost('getUserFollowingChannels').reply(200, mockedFollowedChannels);
