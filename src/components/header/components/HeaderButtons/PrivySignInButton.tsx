import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { FarcasterLogo } from '@app/components/common/icons/FarcasterLogo';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { BASE_COLORS, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT } from '@app/styles/themes/constants';
import { useFarcasterSigner, useLogin, useLogout, usePrivy } from '@privy-io/react-auth';
import { posthog } from 'posthog-js';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

export const PrivySignInButton: React.FC = (props) => {
  const theme = useAppSelector((state) => state.theme.theme);
  const { t } = useTranslation();

  const { ready, authenticated, user } = usePrivy();

  const { login } = useLogin({
    onComplete: () => {
      posthog.capture('user logged in', { method: 'privy' });
    },
  });
  const { logout } = useLogout({
    onSuccess: () => {
      posthog.capture('user logged out', { method: 'privy' });
    },
  });

  const { requestFarcasterSignerFromWarpcast } = useFarcasterSigner();

  const farcasterAccount = user?.farcaster;

  const disableLogin = !ready;

  return authenticated ? (
    !farcasterAccount?.signerPublicKey ? (
      <Button
        type="default"
        size="small"
        $isDark={theme === 'dark'}
        onClick={() => requestFarcasterSignerFromWarpcast()}
        // Prevent requesting a Farcaster signer if a user has not already linked a Farcaster account
        // or if they have already requested a signer
        disabled={!!!farcasterAccount || !!farcasterAccount.signerPublicKey}
      >
        Authorize signer in Warpcast
      </Button>
    ) : (
      <Button
        type="default"
        size="large"
        icon={
          <img
            src={user?.farcaster?.pfp ?? undefined}
            height={32}
            width={32}
            alt={user?.farcaster?.username ?? undefined}
          />
        }
        disabled={disableLogin}
        onClick={logout}
        $isDark={theme === 'dark'}
        {...props}
      >
        @{user?.farcaster?.username}:{user?.farcaster?.fid}
      </Button>
    )
  ) : (
    <Button
      type="default"
      size="small"
      icon={<FarcasterLogo />}
      disabled={disableLogin}
      onClick={login}
      $isDark={theme === 'dark'}
      {...props}
    >
      {t('buttons.sign-in-with-privy')}
    </Button>
  );
};

const Button = styled(BaseButton)<{ $isDark: boolean }>`
  font-weight: ${FONT_WEIGHT.regular};
  font-size: ${FONT_SIZE.md};
  color: ${(props) => BASE_COLORS[props.$isDark ? 'white' : 'black']};
  background: ${(props) => BASE_COLORS[props.$isDark ? 'black' : 'white']};
  border-radius: ${BORDER_RADIUS};
  padding-top: 0;
  padding-bottom: 0;
  display: flex;
  align-items: center;

  &:hover,
  &:active,
  &:focus {
    color: ${(props) => BASE_COLORS[props.$isDark ? 'black' : 'white']};
    background: ${(props) => BASE_COLORS[props.$isDark ? 'white' : 'black']};
  }
`;
