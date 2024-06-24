import { RightOutlined } from '@ant-design/icons';
import curatedChannels from '@app/assets/curated-channels.json';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseSpace } from '@app/components/common/BaseSpace/BaseSpace';
import { BaseTree } from '@app/components/common/BaseTree/BaseTree';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import * as S from '@app/pages/uiComponentsPages//UIComponentsPage.styles';
import { MegaphoneIcon } from 'lucide-react';
import { listify } from 'radash';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const CuratedChannelsPage: React.FC = () => {
  const { t } = useTranslation();

  const flatMap = listify(curatedChannels, (key, values) => values.map((value) => ({ id: value, tag: key }))).flat();

  return (
    <>
      <PageTitle>{t('sidebar.curated')}</PageTitle>
      <BaseSpace direction="vertical" size="middle" style={{ display: 'flex' }}>
        <BaseRow gutter={[30, 30]} justify={'center'}>
          <BaseCol id="top-center" xs={24} lg={18}>
            <S.Card title={t('sidebar.curated')}>
              {flatMap.length} {t('sidebar.curated')}
              <BaseTree
                autoExpandParent={true}
                showLine={true}
                showIcon={false}
                switcherIcon={<RightOutlined />}
                treeData={Object.keys(curatedChannels).map((k) => {
                  const idsForCategory = curatedChannels[k as keyof typeof curatedChannels];
                  const nodes = idsForCategory.map((id) => ({
                    title: <Link to={`/~/channel/${id}`}>{id}</Link>,
                    key: `${k}-${id}`,
                  }));
                  return {
                    title: <span>{k}</span>,
                    key: k,
                    icon: <MegaphoneIcon />,
                    children: nodes,
                  };
                })}
              />
            </S.Card>
          </BaseCol>
        </BaseRow>
        <BaseRow justify={'center'}>
          <BaseCol id="bottom-center" xs={24} lg={18}>
            <S.Card> {t('curated-channels.add-your-own')}</S.Card>
          </BaseCol>
        </BaseRow>
      </BaseSpace>
    </>
  );
};

export default CuratedChannelsPage;
