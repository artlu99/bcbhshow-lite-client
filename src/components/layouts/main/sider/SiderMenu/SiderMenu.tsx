import { ChannelObject } from '@app/api/warpcast-types';
import { getFidWithFallback } from '@app/auth/fids';
import { BaseSpace } from '@app/components/common/BaseSpace/BaseSpace';
import {
  SidebarNavigationItem,
  channelsSkeleton,
  sidebarNavigation as sidebarNavigationPreprocessed,
} from '@app/components/layouts/main/sider/sidebarNavigation';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { allChannelsQuery, userFollowingChannelsQuery } from '@app/queries/queries';
import { FONT_SIZE } from '@app/styles/themes/constants';
import { useNeynarContext } from '@neynar/react';
import { useQuery } from '@tanstack/react-query';
import { PinIcon } from 'lucide-react';
import { sift } from 'radash';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import * as S from './SiderMenu.styles';

interface SiderContentProps {
  setCollapsed: (isCollapsed: boolean) => void;
}

const SiderMenu: React.FC<SiderContentProps> = ({ setCollapsed }) => {
  const { t } = useTranslation();
  const location = useLocation();

  const { user } = useNeynarContext();
  const fid = getFidWithFallback(user);

  const pinnedChannelsState = useAppSelector((state) => state.pinnedChannels);
  const pinnedChannels = pinnedChannelsState.pinnedChannels;

  const acQuery = useQuery(allChannelsQuery());
  const memodAcData = useMemo(() => {
    if (acQuery.isLoading || acQuery.error) return null;
    return acQuery.data?.result?.channels ?? [];
  }, [acQuery.isLoading, acQuery.error, acQuery.data]);

  const ufcQuery = useQuery(userFollowingChannelsQuery(fid));
  const memodUfcData = useMemo(() => {
    if (ufcQuery.isLoading || ufcQuery.error) return null;
    return ufcQuery.data;
  }, [ufcQuery.isLoading, ufcQuery.error, ufcQuery.data]);

  const sidebarNavigationPre = sidebarNavigationPreprocessed.map((nav) => {
    return nav.children
      ? {
          ...nav,
          children: nav.children.map((childNav) => {
            return { ...childNav, url: childNav.key.startsWith('/') ? `/~/channel${childNav.key}` : undefined };
          }),
        }
      : nav;
  });

  const userSpecificChannels: SidebarNavigationItem[] = sift(
    (memodUfcData?.result?.channels ?? [])
      .filter((c) => !pinnedChannels.includes(c.id))
      .map((c) => ({ title: c.name, key: `/${c.id}`, url: `/~/channel/${c.id}` }))
      .slice(0, 3) ?? [],
  );

  const sidebarNavigation = [
    ...sidebarNavigationPre.slice(0, 2),
    {
      ...channelsSkeleton,
      children: [
        ...userSpecificChannels,
        ...sift(
          pinnedChannels.map((pc) => {
            const channelDetail: ChannelObject | undefined = memodAcData?.find((c) => c.id === pc);
            const ret: SidebarNavigationItem | undefined = channelDetail
              ? {
                  key: pc,
                  title: channelDetail.name,
                  icon: <PinIcon size={12} />,
                  url: `/~/channel/${channelDetail.id}`,
                }
              : undefined;
            return ret;
          }),
        ),
      ],
    },
    ...sidebarNavigationPre.slice(2),
  ];

  const sidebarNavFlat = sidebarNavigation.reduce(
    (result: SidebarNavigationItem[], current) =>
      result.concat(current.children && current.children.length > 0 ? current.children : current),
    [],
  );

  const currentMenuItem = sidebarNavFlat.find(({ url }) => url === location.pathname);
  const defaultSelectedKeys = currentMenuItem ? [currentMenuItem.key] : [];

  const openedSubmenu = sidebarNavigation.find(({ children }) =>
    children?.some(({ url }) => url === location.pathname),
  );
  const defaultOpenKeys = openedSubmenu ? [openedSubmenu.key] : [];

  return (
    <S.Menu
      mode="inline"
      defaultSelectedKeys={defaultSelectedKeys}
      defaultOpenKeys={defaultOpenKeys}
      onClick={() => setCollapsed(true)}
      items={sidebarNavigation.map((nav) => {
        const isSubMenu = nav.children?.length;

        return {
          key: nav.key,
          title: t(nav.title),
          label: isSubMenu ? (
            t(nav.title)
          ) : (
            <Link to={nav.url || ''}>
              {t(nav.title)} <BaseSpace style={{ fontSize: FONT_SIZE.xxs }}>{nav.info}</BaseSpace>
            </Link>
          ),
          icon: nav.icon,
          children:
            isSubMenu &&
            nav.children &&
            nav.children.map((childNav) => {
              const isExternal = childNav?.url?.startsWith('https://') ?? false;
              return {
                ...childNav,
                label: childNav.url ? (
                  isExternal ? (
                    <Link to={childNav.url || ''} target="_blank">
                      {t(childNav.title)}
                    </Link>
                  ) : (
                    <Link to={childNav.url || ''}>{t(childNav.title)}</Link>
                  )
                ) : (
                  t(childNav.title)
                ),
                title: t(childNav.title),
              };
            }),
        };
      })}
    />
  );
};

export default SiderMenu;
