import axios from "axios";

export const wikimediaService = axios.create({
  baseURL: "https://commons.wikimedia.org",
});
wikimediaService.interceptors.response.use((res) => res.data);

export type SearchImageRes = {
  batchcomplete: string;
  query: {
    normalized: { from: string; to: string }[];
    pages: Record<
      number,
      {
        ns: number;
        title: string;
        missing?: string;
        imageinfo: [
          {
            url: string;
            extmetadata: {
              DateTimeOriginal: {
                value: string;
              };
            };
          }
        ];
      }
    >;
  };
};

export const searchImage = (term: string) => {
  return wikimediaService.get<any, SearchImageRes>("/w/api.php", {
    params: {
      origin: "*",
      action: "query",
      format: "json",
      prop: "imageinfo",
      iiprop: "url|extmetadata",
      titles: term,
    },
  });
};

export const wikimediaSearchImages = searchImage;
