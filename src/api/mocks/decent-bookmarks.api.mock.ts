import { DecentBookmark } from '@app/api/decent-bookmarks.api';
import { httpApiMock } from '@app/api/mocks/http.api.mock';

export const mockDecentBookmarks: DecentBookmark[] = [
  { timestamp: 1716513040278, fid: 11599, username: 'mjc716', hash: '0xb3517de4209d4187ea3481a0063c5e504242eee9' },
  { timestamp: 1716765881578, fid: 14364, username: 'purp', hash: '0x013f4f82a14bcecbae8bc5e03f42014d18315797' },
  { timestamp: 1717120464712, fid: 99, username: 'jessepollak', hash: '0x0ce350ac0e849a9dccec39f1916b26ec2f916dfd' },
  {
    timestamp: 1717267286586,
    fid: 408979,
    username: 'nmeow.eth',
    hash: '0x7b40af6c847ba4765394d53ee5b89ab3324b0858',
  },
  { timestamp: 1717731428950, fid: 1214, username: 'df', hash: '0x04d309d450ac382d13f1693c41ada86e7a3a39cd' },
  {
    timestamp: 1718068128706,
    fid: 272706,
    username: '0xmaru.eth',
    hash: '0x6bf3764cce4497d89e35a7ee93deb0ac1e201915',
  },
];

httpApiMock.onPost('getDecentBookmarks').reply(200, { bookmarks: mockDecentBookmarks });
