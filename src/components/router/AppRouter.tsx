import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainLayout from '@app/components/layouts/main/MainLayout/MainLayout';
import { withLoading } from '@app/hocs/withLoading.hoc';

const BookmarksPage = React.lazy(() => import('@app/pages/BookmarksPage'));
const LandingPage = React.lazy(() => import('@app/pages/LandingPage'));
const ChannelFeedPage = React.lazy(() => import('@app/pages/ChannelFeedPage'));
const FollowingFeedPage = React.lazy(() => import('@app/pages/FollowingFeedPage'));
const ForYouFeedPage = React.lazy(() => import('@app/pages/ForYouFeedPage'));
const CuratedChannelsPage = React.lazy(() => import('@app/pages/CuratedChannelsPage'));
const SponsorshipPage = React.lazy(() => import('@app/pages/SponsorshipPage'));
const VotesPage = React.lazy(() => import('@app/pages/VotesPage'));
const Error404Page = React.lazy(() => import('@app/pages/Error404Page'));

const Landing = withLoading(LandingPage);
const ChannelFeed = withLoading(ChannelFeedPage);
const FollowingFeed = withLoading(FollowingFeedPage);
const ForYouFeed = withLoading(ForYouFeedPage);
const Bookmarks = withLoading(BookmarksPage);
const Sponsorship = withLoading(SponsorshipPage);
const CuratedChannels = withLoading(CuratedChannelsPage);
const Votes = withLoading(VotesPage);

const Error404 = withLoading(Error404Page);

export const AppRouter: React.FC = () => {
  const protectedLayout = <MainLayout />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={protectedLayout}>
          <Route index element={<FollowingFeed />} />
          <Route path="home" element={<FollowingFeed />} />
          <Route path="foryou" element={<ForYouFeed />} />
          <Route path="~">
            <Route path="channel">
              <Route path=":channelId" element={<ChannelFeed />} />
            </Route>
          </Route>
          <Route path="external">
            <Route path="decent-bookmarks" element={<Bookmarks />} />
          </Route>
          <Route path="sponsorship" element={<Sponsorship />} />
          <Route path="curated-channels" element={<CuratedChannels />} />
          <Route path="votes" element={<Votes />} />
          <Route path="about" element={<Landing />} />
          <Route path="404" element={<Error404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
