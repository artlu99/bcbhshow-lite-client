export enum HubReactionType {
  NONE = 0,
  /** LIKE - Like the target cast */
  LIKE = 1,
  /** RECAST - Share target cast to the user's audience */
  RECAST = 2,
}

export interface HubReactionsResponse {
  messages: {
    data: {
      type: 'MESSAGE_TYPE_REACTION_ADD';
      network: 'FARCASTER_NETWORK_MAINNET';
      fid: number;
      timestamp: number;
      reactionBody: {
        type: 'REACTION_TYPE_LIKE' | 'REACTION_TYPE_RECAST';
        targetCastId: {
          fid: number;
          hash: string;
        };
      };
    };
    hash: string;
    hashScheme: 'HASH_SCHEME_BLAKE3';
    signature: string;
    signatureScheme: 'SIGNATURE_SCHEME_ED25519';
    signer: string;
  }[];
  nextPageToken?: string;
}
