export interface FeedObject {
  casts: CastObject[];
  next?: { cursor: string };
}

export interface CastObject {
  hash: string;
  timestamp: number;
  object: 'cast';
  author: {
    active_status: 'inactive' | 'active';
    fid: number;
    display_name?: string;
    username?: string;
    pfp_url?: string;
    custody_address?: string;
    follower_count?: number;
    following_count?: number;
    object: 'user' | 'group';
    verified_addresses?: {
      eth_addresses?: string[];
      sol_addresses?: string[];
    };
    verifications?: string[];
    power_badge?: boolean;
    profile?: {
      bio?: {
        text?: string;
        mentioned_profiles?: UserProfile[];
      };
    };
  };
  text: string;
  mentioned_profiles: UserProfile[];
  parent_author: { fid: number | null };
  parent_hash: string | null;
  root_parent_url?: string;
  thread_hash?: string;
  parent_url?: string;
  embeds?: EmbedObject[];
  frames?: FrameObject[];
  reactions: {
    likes: UserDetails[];
    likes_count: number;
    recasts: UserDetails[];
    recasts_count: number;
  };
  replies: { count: number };
}

export interface EmbedObject {
  url?: string;
  cast_id?: {
    fid: number;
    hash: string;
  };
}

export interface FrameObject {
  buttons?: FrameButtonObject[];
  frames_url?: string;
  image?: string;
  input?: FrameInputObject;
  post_url?: string;
  state?: FrameStateObject;
  title?: string;
  version?: string;
}

export interface FrameButtonObject {
  action_type: 'post' | 'like' | 'recast' | 'comment' | 'share' | 'follow' | 'unfollow' | 'vote';
  index: number;
  title: string;
}

export interface FrameInputObject {
  type?: 'text' | 'number' | 'email' | 'url' | 'date' | 'time' | 'datetime' | 'select' | 'multiselect';
  placeholder?: string;
  value?: string;
  options?: FrameInputOptionObject[];
  min?: number;
  max?: number;
}

export interface FrameInputOptionObject {
  value: string;
  label: string;
}

export interface FrameStateObject {
  value?: string;
  options?: FrameStateOptionObject[];
}

export interface FrameStateOptionObject {
  value: string;
  label: string;
}

interface UserDetails {
  fid: number;
  fname: string;
}

interface UserProfile {
  fid: number;
  username?: string;
  display_name?: string;
  follower_count: number;
  following_count: number;
  pfp_url: string | null;
  power_badge: boolean;
  object: 'user' | 'group';
  active_status?: 'inactive' | 'active';
  custody_address?: string;
  verified_addresses?: {
    eth_addresses?: string[];
    sol_addresses?: string[];
  };
  verifications?: string[];
  profile?: {
    bio?: {
      text?: string;
      mentioned_profiles?: UserProfile[];
    };
  };
}
