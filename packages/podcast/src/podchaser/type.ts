export type Root = {
  entities: Array<{
    episode_type: string;
    weighted_rating_alltime: number;
    episode_url: string;
    list_count?: number;
    image_url: string;
    length: number;
    description: string;
    review_count: number;
    podcast_id: number;
    title: string;
    rating_count: number;
    air_date: string;
    podcast: {
      image_url: string;
      feed_url: string;
      id: number;
      categories: Array<{
        id: number;
        text: string;
        slug: string;
      }>;
      title: string;
      slug: string;
    };
    creator_count: number;
    guid: string;
    audio_url: string;
    id: number;
    exclusive_to: string;
    slug: string;
    highlight: Array<any>;
    external_ids: {
      spotify: string;
    };
    rating?: number;
    creator_summary?: Array<number>;
  }>;
  total: number;
  has_more: boolean;
  additional_entities: {
    podcasts: Array<{
      weighted_rating_alltime: number;
      number_of_episodes: number;
      itunes_id: string;
      created_at: string;
      review_count: number;
      description: string;
      title: string;
      creator_role_counts: Array<{
        role: string;
        count: number;
      }>;
      follower_count: number;
      is_claimed: boolean;
      updated_at: string;
      feed_url: string;
      id: number;
      categories: Array<{
        id: number;
        text: string;
        slug: string;
        relevance: number;
      }>;
      date_of_latest_episode: string;
      slug: string;
      display_rating: number;
      list_count: number;
      image_url: string;
      initial_rating: string;
      rating_count: number;
      date_of_first_episode: string;
      creator_summary: Array<{
        role: {
          code: string;
          role_rank: number;
          description: string;
          title: string;
        };
        name: string;
        pcid: string;
        id: number;
        informal_name: string;
      }>;
      creator_count: number;
      exclusive_to: string;
    }>;
    creators: Array<{
      episode_credit_count: number;
      most_recent_episode: {
        air_date: string;
        podcast: {
          itunes_id: string;
          image_url: string;
          feed_url: string;
          id: number;
          categories: Array<{
            id: number;
            text: string;
            slug: string;
            relevance: number;
          }>;
          title: string;
          initial_rating: string;
          slug: string;
        };
        id: number;
        title: string;
        slug: string;
      };
      bio: string;
      created_at: string;
      role_summary: Array<{
        entity_type: string;
        roles: Array<{
          code: string;
          role_rank: number;
          description: string;
          title: string;
          group?: string;
        }>;
        entity_id: number;
        entity: {
          image_url: string;
          id: number;
          title: string;
          slug: string;
        };
      }>;
      confirmed: boolean;
      follower_count: number;
      confidence_votes: string;
      informal_name: string;
      twitter_handle?: string;
      role_summary_unconfirmed?: Array<{
        entity_type: string;
        roles: Array<{
          code: string;
          role_rank: number;
          description: string;
          title: string;
        }>;
        entity_id: number;
        entity: {
          image_url: string;
          id: number;
          title: string;
          slug: string;
        };
      }>;
      id: number;
      categories: Array<{
        id: number;
        text: string;
        slug: string;
        relevance: number;
      }>;
      subtitle_long: string;
      unconfirmed_count?: number;
      podcast_credit_count: number;
      subtitle_short: string;
      submitted_by: {
        profile_image_url?: string;
        id: number;
        display_name: string;
        username: string;
        informal_name: string;
        featuredBadge: any;
      };
      profile_image_url: string;
      follower_user_ids: Array<number>;
      creator_user: {
        verified: boolean;
        id: any;
      };
      subscriber_count: number;
      name: string;
      changes_requested: boolean;
      pcid: string;
      suggested_credit_count: number;
    }>;
  };
  sort: {
    sort: string;
    direction: string;
  };
};
