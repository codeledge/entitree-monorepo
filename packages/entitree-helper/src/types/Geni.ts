export type GeniProfile = {
  id: string;
  url: string;
  profile_url: string;
  public: boolean;
  guid: string;
  first_name: string;
  middle_name?: string;
  maiden_name?: string;
  title?: string;
  suffix?: string;
  nicknames?: string[];
  last_name?: string;
  name: string;
  is_alive: boolean;
  gender: string;
  occupation?: string;
  created_by?: string;
  display_name?: string;
  claimed?: boolean;
  curator?: string;
  current_residence?: GeniLocation;
  big_tree?: boolean;
  mugshot_urls?: GeniPhoto;
  unions?: string[];
  marriage_orders?: { [key: string]: number };
  birth_order?: number;
  living?: boolean;
  creator?: string;
  birth?: GeniEvent;
  baptism?: GeniEvent;
  death?: GeniEvent;
  burial?: GeniEvent;
  location?: GeniLocation;
  photo_urls?: GeniPhoto;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  names?: { [key: string]: GeniName };
  project_ids?: string[];
  merge_note?: string;
  language?: string;
  account_type?: "basic";
  is_curator?: boolean;
  cause_of_death?: string;
  relationship?: string; //from api_key owner ex. great grandmother
};

type GeniName = {
  first_name?: string;
  last_name?: string;
  middle_name?: string;
  maiden_name?: string;
  display_name?: string;
  suffix?: string;
  title?: string;
  nicknames?: string;
};

export type GeniPhoto = {
  large?: string;
  medium: string;
  small: string;
  thumb: string;
  print: string;
  thumb2: string;
  url: string;
  original?: string;
};

type GeniLocation = {
  city?: string;
  state?: string;
  county?: string;
  country?: string;
  country_code?: string;
  postal_code?: string;
  street_address1?: string;
  street_address2?: string;
  street_address3?: string;
  latitude?: number;
  longitude?: number;
  formatted_location: string;
  place_name?: string;
};

type GeniEvent = {
  date?: {
    day?: number;
    month?: number;
    year: number;
    range?: "after" | "before";
    formatted_date: string;
    circa?: boolean;
  };
  location?: GeniLocation;
};

export type GeniProfileResults = {
  results: GeniProfile[];
};

export type GeniImmediateFamilyResults = {
  results: GeniImmediateFamily[];
};

export type GeniImmediateFamily = {
  focus: GeniProfile;
  nodes: Record<string, GeniNode>;
};

export type GeniRelType = "child" | "partner";

export type GeniEdge = {
  rel: GeniRelType;
};

export type GeniNode = GeniProfile & {
  edges: Record<string, GeniEdge>;
};

export type GeniUnion = {
  id: string;
  url: string;
  guid: string;
  status: "spouse";
  edges: Record<string, GeniEdge>;
};
