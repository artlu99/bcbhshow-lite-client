import { httpApiMock } from '@app/api/mocks/http.api.mock';

const mockResult = {
  reactions: [
    {
      reaction_type: 'like',
      cast: {
        object: 'cast',
        hash: '0x02d5fe5e3217b362d617018377e51638a82550b7',
        thread_hash: '0x65235b7f329cf94cab493d969cc5dc3b06179857',
        parent_hash: '0x65235b7f329cf94cab493d969cc5dc3b06179857',
        parent_url: null,
        root_parent_url: 'https://warpcast.com/~/channel/bcbhshow',
        parent_author: {
          fid: 15850,
        },
        author: {
          object: 'user',
          fid: 6596,
          custody_address: '0xb2fd03ef766efdacd8092cae0352997b6cc12c5e',
          username: 'king',
          display_name: 'kk',
          pfp_url: 'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/3427f9ce-8465-4ef2-96f8-d630341b4100/original',
          profile: {
            bio: {
              text: 'Building frames.sh.',
            },
          },
          follower_count: 6292,
          following_count: 955,
          verifications: ['0xdd6057e8b997bd9484c46f1bcec7c75138b4552c'],
          verified_addresses: {
            eth_addresses: ['0xdd6057e8b997bd9484c46f1bcec7c75138b4552c'],
            sol_addresses: [],
          },
          active_status: 'inactive',
          power_badge: true,
          viewer_context: {
            following: true,
            followed_by: true,
          },
        },
        text: 'we are so back!',
        timestamp: '2024-06-20T16:58:38.000Z',
        embeds: [],
        reactions: {
          likes_count: 2,
          recasts_count: 0,
          likes: [
            {
              fid: 6546,
              fname: 'artlu',
            },
            {
              fid: 15850,
              fname: 'christin',
            },
          ],
          recasts: [],
        },
        replies: {
          count: 1,
        },
        channel: null,
        mentioned_profiles: [],
        viewer_context: {
          liked: true,
          recasted: false,
        },
      },
      reaction_timestamp: '2024-06-20T17:25:03.000Z',
      object: 'likes',
    },
    {
      reaction_type: 'like',
      cast: {
        object: 'cast',
        hash: '0xdbd9d2424fab89b1403e2d9da0c3aad27eb1f0c7',
        thread_hash: '0x7b84c1a7e0a511da141ccd716ac348aeba60dbb3',
        parent_hash: '0x7b84c1a7e0a511da141ccd716ac348aeba60dbb3',
        parent_url: null,
        root_parent_url: 'https://warpcast.com/~/channel/bcbhshow',
        parent_author: {
          fid: 15850,
        },
        author: {
          object: 'user',
          fid: 15850,
          custody_address: '0x73ed37b01877e24e18f229c29588da065ffbd632',
          username: 'christin',
          display_name: 'christin',
          pfp_url: 'https://i.imgur.com/JzRgd9h.jpg',
          profile: {
            bio: {
              text: 'neuroscience PhD, onchain chaplain for /spirituality, vibe imagineer for /christin, co-host of /bcbhshow for the farcaster middle class. seemore.tv/christin',
            },
          },
          follower_count: 46400,
          following_count: 1032,
          verifications: ['0x2d240c5d58a8445e99dadf3fd41a492dfeaf7e4c'],
          verified_addresses: {
            eth_addresses: ['0x2d240c5d58a8445e99dadf3fd41a492dfeaf7e4c'],
            sol_addresses: [],
          },
          active_status: 'inactive',
          power_badge: true,
          viewer_context: {
            following: true,
            followed_by: true,
          },
        },
        text: 'welp turns out it was me who got voted off 😒',
        timestamp: '2024-06-20T17:03:48.000Z',
        embeds: [],
        reactions: {
          likes_count: 2,
          recasts_count: 0,
          likes: [
            {
              fid: 338166,
              fname: 'alexkarr',
            },
            {
              fid: 6546,
              fname: 'artlu',
            },
          ],
          recasts: [],
        },
        replies: {
          count: 0,
        },
        channel: null,
        mentioned_profiles: [],
        viewer_context: {
          liked: true,
          recasted: false,
        },
      },
      reaction_timestamp: '2024-06-20T17:24:51.000Z',
      object: 'likes',
    },
    {
      reaction_type: 'like',
      cast: {
        object: 'cast',
        hash: '0x97ed8583807fa8ced601d848c13d3a75d018a375',
        thread_hash: '0xecd28a1563ad799b350f154a3efc7c65359f271c',
        parent_hash: '0xf3f3c8f6f4216463b64287f495018b0288315e10',
        parent_url: null,
        root_parent_url: 'https://warpcast.com/~/channel/castout',
        parent_author: {
          fid: 4167,
        },
        author: {
          object: 'user',
          fid: 15850,
          custody_address: '0x73ed37b01877e24e18f229c29588da065ffbd632',
          username: 'christin',
          display_name: 'christin',
          pfp_url: 'https://i.imgur.com/JzRgd9h.jpg',
          profile: {
            bio: {
              text: 'neuroscience PhD, onchain chaplain for /spirituality, vibe imagineer for /christin, co-host of /bcbhshow for the farcaster middle class. seemore.tv/christin',
            },
          },
          follower_count: 46400,
          following_count: 1032,
          verifications: ['0x2d240c5d58a8445e99dadf3fd41a492dfeaf7e4c'],
          verified_addresses: {
            eth_addresses: ['0x2d240c5d58a8445e99dadf3fd41a492dfeaf7e4c'],
            sol_addresses: [],
          },
          active_status: 'inactive',
          power_badge: true,
          viewer_context: {
            following: true,
            followed_by: true,
          },
        },
        text: 'thank you for all the hard work behind the scenes to make the game happen!!\n\ntoday has been slow fishing 🎣 so everyone on the boat enjoyed my real time reaction to being blindsided 🤪 this is how we onboard the next billion right? right? *natalie portman meme*',
        timestamp: '2024-06-20T17:07:58.000Z',
        embeds: [],
        reactions: {
          likes_count: 2,
          recasts_count: 0,
          likes: [
            {
              fid: 6546,
              fname: 'artlu',
            },
            {
              fid: 4167,
              fname: 'thenounishprof.eth',
            },
          ],
          recasts: [],
        },
        replies: {
          count: 1,
        },
        channel: null,
        mentioned_profiles: [],
        viewer_context: {
          liked: true,
          recasted: false,
        },
      },
      reaction_timestamp: '2024-06-20T17:24:42.000Z',
      object: 'likes',
    },
    {
      reaction_type: 'like',
      cast: {
        object: 'cast',
        hash: '0x67e7ed2776cf5ff02115efc6f321ae54580c0ed6',
        thread_hash: '0xecd28a1563ad799b350f154a3efc7c65359f271c',
        parent_hash: '0x988b808dd37dfad499aea1630f4e2d5d6f8218bc',
        parent_url: null,
        root_parent_url: 'https://warpcast.com/~/channel/castout',
        parent_author: {
          fid: 847,
        },
        author: {
          object: 'user',
          fid: 15850,
          custody_address: '0x73ed37b01877e24e18f229c29588da065ffbd632',
          username: 'christin',
          display_name: 'christin',
          pfp_url: 'https://i.imgur.com/JzRgd9h.jpg',
          profile: {
            bio: {
              text: 'neuroscience PhD, onchain chaplain for /spirituality, vibe imagineer for /christin, co-host of /bcbhshow for the farcaster middle class. seemore.tv/christin',
            },
          },
          follower_count: 46400,
          following_count: 1032,
          verifications: ['0x2d240c5d58a8445e99dadf3fd41a492dfeaf7e4c'],
          verified_addresses: {
            eth_addresses: ['0x2d240c5d58a8445e99dadf3fd41a492dfeaf7e4c'],
            sol_addresses: [],
          },
          active_status: 'inactive',
          power_badge: true,
          viewer_context: {
            following: true,
            followed_by: true,
          },
        },
        text: 'thank you 🧟‍♀️ should have listened to @jayce and @links who both advised me to play more aggressively this week',
        timestamp: '2024-06-20T17:19:52.000Z',
        embeds: [],
        reactions: {
          likes_count: 4,
          recasts_count: 0,
          likes: [
            {
              fid: 1890,
              fname: 'jayce',
            },
            {
              fid: 847,
              fname: 'meesh',
            },
            {
              fid: 6546,
              fname: 'artlu',
            },
            {
              fid: 18586,
              fname: 'links',
            },
          ],
          recasts: [],
        },
        replies: {
          count: 2,
        },
        channel: null,
        mentioned_profiles: [
          {
            object: 'user',
            fid: 1890,
            custody_address: '0x80ec31ef159f54c996cc0eae2db8b3dec4cc94f1',
            username: 'jayce',
            display_name: 'Chaotic Neutral',
            pfp_url: 'https://i.seadn.io/gcs/files/e7d49b5c2a6021ff1543a69cfa466719.jpg?w=500&auto=format',
            profile: {
              bio: {
                text: 'Product at Popular Science and Futurism. \nHave literal skin in the game on /nonanon',
                mentioned_profiles: [],
              },
            },
            follower_count: 2173,
            following_count: 437,
            verifications: ['0xc4ba0252a3b0dd1a80e329258e44cc2dae26abce'],
            verified_addresses: {
              eth_addresses: ['0xc4ba0252a3b0dd1a80e329258e44cc2dae26abce'],
              sol_addresses: [],
            },
            active_status: 'inactive',
            power_badge: true,
          },
          {
            object: 'user',
            fid: 18586,
            custody_address: '0xfde7386f73aca34bd429408d6347de802147f60c',
            username: 'links',
            display_name: 'links',
            pfp_url: 'https://i.imgur.com/UFDP8h4.jpg',
            profile: {
              bio: {
                text: 'Startup artist seeking inspiration.  Champion of /bcard',
                mentioned_profiles: [],
              },
            },
            follower_count: 7398,
            following_count: 671,
            verifications: ['0x74fa01a5d0ef8039f1e14f4d4c8f90e8602e07b4'],
            verified_addresses: {
              eth_addresses: ['0x74fa01a5d0ef8039f1e14f4d4c8f90e8602e07b4'],
              sol_addresses: [],
            },
            active_status: 'inactive',
            power_badge: true,
          },
        ],
        viewer_context: {
          liked: true,
          recasted: false,
        },
      },
      reaction_timestamp: '2024-06-20T17:24:25.000Z',
      object: 'likes',
    },
    {
      reaction_type: 'like',
      cast: {
        object: 'cast',
        hash: '0x65235b7f329cf94cab493d969cc5dc3b06179857',
        thread_hash: '0x65235b7f329cf94cab493d969cc5dc3b06179857',
        parent_hash: null,
        parent_url: 'https://warpcast.com/~/channel/bcbhshow',
        root_parent_url: 'https://warpcast.com/~/channel/bcbhshow',
        parent_author: {
          fid: null,
        },
        author: {
          object: 'user',
          fid: 15850,
          custody_address: '0x73ed37b01877e24e18f229c29588da065ffbd632',
          username: 'christin',
          display_name: 'christin',
          pfp_url: 'https://i.imgur.com/JzRgd9h.jpg',
          profile: {
            bio: {
              text: 'neuroscience PhD, onchain chaplain for /spirituality, vibe imagineer for /christin, co-host of /bcbhshow for the farcaster middle class. seemore.tv/christin',
            },
          },
          follower_count: 46400,
          following_count: 1032,
          verifications: ['0x2d240c5d58a8445e99dadf3fd41a492dfeaf7e4c'],
          verified_addresses: {
            eth_addresses: ['0x2d240c5d58a8445e99dadf3fd41a492dfeaf7e4c'],
            sol_addresses: [],
          },
          active_status: 'inactive',
          power_badge: true,
          viewer_context: {
            following: true,
            followed_by: true,
          },
        },
        text: '…and I’ll be back next week with @artlu for the /bcbhshow for a tell-all retrospective!! I learned a lot from this game that applies to work and life 🧐 hope to share useful learnings with y’all\n\n(maybe I’ll let @artlu talk a little)\n\nBCBHSHOW \nSEASON 2 PREMIERES\nJUNE 25 TUESDAY \n8AM PT / 11 AM ET / 3PM UTC',
        timestamp: '2024-06-20T16:55:27.000Z',
        embeds: [
          {
            cast_id: {
              fid: 15850,
              hash: '0xecd28a1563ad799b350f154a3efc7c65359f271c',
            },
          },
        ],
        reactions: {
          likes_count: 7,
          recasts_count: 1,
          likes: [
            {
              fid: 338166,
              fname: 'alexkarr',
            },
            {
              fid: 6546,
              fname: 'artlu',
            },
            {
              fid: 646845,
              fname: 'alfabugti',
            },
            {
              fid: 6622,
              fname: 'frdysk.eth',
            },
            {
              fid: 15211,
              fname: 'statuette',
            },
          ],
          recasts: [
            {
              fid: 6596,
              fname: 'king',
            },
          ],
        },
        replies: {
          count: 1,
        },
        channel: {
          object: 'channel_dehydrated',
          id: 'bcbhshow',
          name: 'The BeavChris and BArt-Head Show',
          image_url: 'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/90dc6268-931b-44d7-5672-ef5a28009200/original',
        },
        mentioned_profiles: [
          {
            object: 'user',
            fid: 6546,
            custody_address: '0x21ca9f0f7c0b59f616b1d96325d55b62c9661d6d',
            username: 'artlu',
            display_name: '🎩.artlu.eth👃呂Kunst 1%',
            pfp_url: 'https://i.imgur.com/L7pqNbi.gif',
            profile: {
              bio: {
                text: "Unforgettable Hair /bcbhshow, Unforgettable @farchiver 🌌.\n\nPFP: warpcast.com/goose/0x9da7eca8 glitch'd by @0mbre\n\nfcan.xyz | farchiver.xyz d33m:liv",
                mentioned_profiles: [],
              },
            },
            follower_count: 40974,
            following_count: 2446,
            verifications: ['0x094f1608960a3cb06346cfd55b10b3cec4f72c78'],
            verified_addresses: {
              eth_addresses: ['0x094f1608960a3cb06346cfd55b10b3cec4f72c78'],
              sol_addresses: ['HgKZky6hf1fiRPuM6tAc2yn9pKvnEeiMmfRGJGWQBTJh'],
            },
            active_status: 'inactive',
            power_badge: true,
          },
          {
            object: 'user',
            fid: 6546,
            custody_address: '0x21ca9f0f7c0b59f616b1d96325d55b62c9661d6d',
            username: 'artlu',
            display_name: '🎩.artlu.eth👃呂Kunst 1%',
            pfp_url: 'https://i.imgur.com/L7pqNbi.gif',
            profile: {
              bio: {
                text: "Unforgettable Hair /bcbhshow, Unforgettable @farchiver 🌌.\n\nPFP: warpcast.com/goose/0x9da7eca8 glitch'd by @0mbre\n\nfcan.xyz | farchiver.xyz d33m:liv",
                mentioned_profiles: [],
              },
            },
            follower_count: 40974,
            following_count: 2446,
            verifications: ['0x094f1608960a3cb06346cfd55b10b3cec4f72c78'],
            verified_addresses: {
              eth_addresses: ['0x094f1608960a3cb06346cfd55b10b3cec4f72c78'],
              sol_addresses: ['HgKZky6hf1fiRPuM6tAc2yn9pKvnEeiMmfRGJGWQBTJh'],
            },
            active_status: 'inactive',
            power_badge: true,
          },
        ],
        viewer_context: {
          liked: true,
          recasted: false,
        },
      },
      reaction_timestamp: '2024-06-20T17:23:57.000Z',
      object: 'likes',
    },
  ],
  cursor: 'eyJ0aW1lc3RhbXAiOiIyMDI0LTA2LTIwIDE3OjIzOjU3LjAwMDAwMDAifQ%3D%3D',
};
httpApiMock.onPost('getNeynarReactionsByFid').reply(200, mockResult);
