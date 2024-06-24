import { DecentBookmark, getDecentBookmarks } from '@app/api/decent-bookmarks.api';
import { getFidWithFallback } from '@app/auth/fids';
import { BookmarkCard } from '@app/components/apps/bookmarks/BookmarkCard';
import { BaseEmpty } from '@app/components/common/BaseEmpty/BaseEmpty';
import { BaseFeed } from '@app/components/common/BaseFeed/BaseFeed';
import { useNeynarContext } from '@neynar/react';
import { useEffect, useState } from 'react';

interface DecentBookmarkResponse {
  bookmarks: DecentBookmark[];
}
export const Bookmarks: React.FC = () => {
  const [bookmarks, setBookmarks] = useState<DecentBookmark[]>([]);
  const [hasMore] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);

  const { user } = useNeynarContext();
  const fid = getFidWithFallback(user);

  useEffect(() => {
    getDecentBookmarks({ fid })
      .then((res: DecentBookmarkResponse) =>
        setBookmarks(res.bookmarks.slice().sort((a, b) => b.timestamp - a.timestamp)),
      )
      .finally(() => setLoaded(true));
  }, [fid]);

  return bookmarks?.length || !loaded ? (
    <BaseFeed
      next={() => {
        return;
      }}
      hasMore={hasMore}
    >
      {bookmarks.map((bookmark, index) => (
        <BookmarkCard bookmark={bookmark} key={`bookmark-${index}`} />
      ))}
    </BaseFeed>
  ) : (
    <BaseEmpty />
  );
};
