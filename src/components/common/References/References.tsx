import { GithubOutlined } from '@ant-design/icons';
import * as S from './References.styles';

export const References: React.FC = () => {
  return (
    <S.ReferencesWrapper>
      <S.Text>
        &copy; 2024{' '}
        <a href="https://seemore.tv/bcbhshow" target="_blank" rel="noreferrer">
          BCBHShow
        </a>
      </S.Text>
      <S.Icons>
        <a href="https://github.com/artlu99/bcbhshow-lite-client" target="_blank" rel="noreferrer">
          <GithubOutlined />
        </a>
      </S.Icons>
    </S.ReferencesWrapper>
  );
};
