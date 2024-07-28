const warpcastUrlPath = 'https://warpcast.com/~/channel';
const supercastUrlPath = 'https://supercast.xyz/channel';

// TODO: allow user to select from a list of alt clients
export const preferredClientUrlPath = true ? warpcastUrlPath : supercastUrlPath;

interface LinkProps {
  username?: string;
  fid?: number;
  hash: string;
}
export const warpcastLink = (props: LinkProps) => {
  const { username, hash } = props;
  return username
    ? `https://warpcast.com/${username}/${hash.slice(0, 10)}`
    : `https://warpcast.com/~/conversations/${hash}`;
};

export const supercastLink = (props: LinkProps) => {
  const { hash } = props;
  return `https://supercast.xyz/c/${hash}`;
};

export const farquestLink = (props: LinkProps) => {
  const { fid, hash } = props;
  return fid ? `https://far.quest/${fid}/${hash}` : undefined;
};

export const recasterLink = (props: LinkProps) => {
  const { hash } = props;
  return `recaster://cast/${hash}`;
};

export const degencastLink = (props: LinkProps) => {
  const { hash } = props;
  return `https://degencast.xyz/casts/${hash.slice(2)}`;
};

export const herocastLink = (props: LinkProps) => {
  const { hash } = props;
  return `https://app.herocast.xyz/conversation/${hash}`;
};

export const wildcardLink = (props: LinkProps) => {
  const { fid, hash } = props;
  return fid ? `https://app.wildcard.lol/cast/${hash}/${fid}` : undefined;
};
