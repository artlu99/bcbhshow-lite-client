import { References } from '@app/components/common/References/References';
import { Header } from '@app/components/header/Header';
import MainContent from '@app/components/layouts/main//MainContent/MainContent';
import MainSider from '@app/components/layouts/main//sider/MainSider/MainSider';
import { MainHeader } from '@app/components/layouts/main/MainHeader/MainHeader';
import { useResponsive } from '@app/hooks/useResponsive';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import * as S from './MainLayout.styles';

const MainLayout: React.FC = () => {
  const [isTwoColumnsLayout, setIsTwoColumnsLayout] = useState(true);
  const [siderCollapsed, setSiderCollapsed] = useState(true);
  const { isDesktop } = useResponsive();

  const toggleSider = () => setSiderCollapsed(!siderCollapsed);

  useEffect(() => {
    setIsTwoColumnsLayout(false && isDesktop);
  }, [isDesktop]);

  return (
    <S.LayoutMaster>
      <MainSider isCollapsed={siderCollapsed} setCollapsed={setSiderCollapsed} />
      <S.LayoutMain>
        <MainHeader isTwoColumnsLayout={isTwoColumnsLayout}>
          <Header toggleSider={toggleSider} isSiderOpened={!siderCollapsed} isTwoColumnsLayout={isTwoColumnsLayout} />
        </MainHeader>
        <MainContent id="main-content" $isTwoColumnsLayout={isTwoColumnsLayout}>
          <div>
            <Outlet />
          </div>
          {!isTwoColumnsLayout && <References />}
        </MainContent>
      </S.LayoutMain>
    </S.LayoutMaster>
  );
};

export default MainLayout;
