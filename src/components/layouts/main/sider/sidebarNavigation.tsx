import {
  CheckCircleOutlined,
  CompassOutlined,
  HomeOutlined,
  LayoutOutlined,
  LineChartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { ThumbsUpIcon } from 'lucide-react';

export interface SidebarNavigationItem {
  title: string;
  key: string;
  info?: string;
  url?: string;
  children?: SidebarNavigationItem[];
  icon?: React.ReactNode;
}

export const channelsSkeleton: SidebarNavigationItem = {
  title: 'sidebar.channels',
  key: 'channels',
  icon: <CompassOutlined />,
};

export const sidebarNavigation: SidebarNavigationItem[] = [
  {
    title: 'sidebar.feed',
    key: 'feed',
    icon: <HomeOutlined />,
    info: '(Reverse Chron)',
    url: '/home',
  },
  {
    title: 'sidebar.foryou',
    key: 'foryou',
    icon: <UserOutlined />,
    info: '(OpenRank)',
    url: '/foryou',
  },
  {
    title: 'sidebar.curated',
    key: 'curated',
    icon: <CheckCircleOutlined />,
    url: '/curated-channels',
  },
  {
    title: 'sidebar.votes',
    key: 'votes',
    icon: <ThumbsUpIcon />,
    url: '/votes',
  },
  {
    title: 'sidebar.bookmarks',
    key: 'bookmarks',
    url: '/external/decent-bookmarks',
    icon: <LayoutOutlined />,
  },
  {
    title: 'sidebar.sponsorship',
    key: 'sponsor',
    url: '/sponsorship',
    icon: <LineChartOutlined />,
  },
];
