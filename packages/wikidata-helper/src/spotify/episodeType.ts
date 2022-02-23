export interface EpisodeObject {
  audio_preview_url: string;
  description: string;
  duration_ms: number;
  explicit?: boolean; //edited
  external_urls: string[];
  href: string;
  html_description: string;
  id: string;
  images: any;
  is_externally_hosted: boolean;
  is_playable: boolean;
  languages: [string];
  name: string;
  release_date: string;
  release_precision_date: string;
  restrictions: {};
  resume_point: {};
  show: {};
  type: string;
  uri: string;
}
