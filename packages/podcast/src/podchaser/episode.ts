export type EpisodeInside = {
  id: number;
  podcast_id: number;
  title: string;
  air_date: string;
  length: number;
  image_url: string;
  audio_url: string;
  episode_url: string;
  description: string;
  slug: string;
  guid: string;
  episode_type: string;
  exclusive_to: string;
  list_count: number;
  creator_count: number;
  rating_count: number;
  display_rating: any;
  weighted_rating_alltime: number;
  review_count: number;
  creator_summary: Array<{
    id: number;
    pcid: string;
    name: string;
    roles: Array<{
      role: string;
      role_group: string;
    }>;
  }>;
};

export type SingleEpisode = {
  id: number;
  podcast_id: number;
  title: string;
  air_date: string;
  length: number;
  audio_quality: any;
  image_url: string;
  audio_url: string;
  file_size: number;
  created_at: string;
  updated_at: string;
  episode_url: string;
  is_explicit: boolean;
  description: string;
  description_sanitized: string;
  slug: string;
  guid: string;
  visibility: string;
  season: any;
  episode_number: any;
  episode_type: string;
  meta_data: {
    season: any;
    episode_type: string;
    external_ids: {
      spotify: string;
    };
  };
  episode_num: any;
  exclusive_to: string;
  list_count: number;
  creator_count: number;
  total_hashtag_count: number;
  hashtags: Array<any>;
  rating_count: number;
  review_count: number;
  rating: any;
  prev_episode: EpisodeInside;
  next_episode: EpisodeInside;
  episode_sponsors: Array<any>;
  full_record: boolean;
  podcast: {
    id: number;
    title: string;
    feed_url: string;
    description: string;
    image_url: string;
    slug: string;
    initial_rating: string;
    categories: Array<{
      id: number;
      text: string;
      slug: string;
      relevance: number;
    }>;
  };
};
