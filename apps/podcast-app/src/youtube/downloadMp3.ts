import YoutubeMp3Downloader, {
  IYoutubeMp3DownloaderOptions,
} from "youtube-mp3-downloader";

import fs from "fs";
import path from "path";

export class YoutubeMp3DowloaderCustom {
  YD: YoutubeMp3Downloader;

  constructor(options: IYoutubeMp3DownloaderOptions) {
    //Configure YoutubeMp3Downloader with your settings
    this.YD = new YoutubeMp3Downloader({ ...options });
    this.setDefaultOptions();
  }
  setDefaultOptions() {
    this.YD.on("finished", function (err, data) {
      // console.log(JSON.stringify(data));
      console.log("Finished downloading => filename: " + data.videoTitle);
    });

    this.YD.on("error", function (error) {
      console.log(error);
    });

    this.YD.on("progress", function (progress) {
      // console.log(JSON.stringify(progress.progress.percentage));
      console.log(
        "Dowloading...",
        progress.videoId,
        " => ",
        progress.progress.percentage.toFixed(2) + "%"
      );
    });
  }

  getMp3(id: string, name: string = "") {
    if (id.includes("https://www.youtube.com/watch?v=")) {
      id = id.replace("https://www.youtube.com/watch?v=", "");
    }
    //Download video and save as MP3 file
    this.YD.download(id, id + ".mp3");
  }
}
export function downloadVideos(list: string[]) {
  const folder = process.env.PROJECT_ROOT + "/public/yt";
  const dowloaderMp3 = new YoutubeMp3DowloaderCustom({
    ffmpegPath: "/usr/bin/ffmpeg", // FFmpeg binary location
    outputPath: folder, // Output file location (default: the home directory)
    youtubeVideoQuality: "highestaudio", // Desired video quality (default: highestaudio)
    queueParallelism: 4, // Download parallelism (default: 1)
    progressTimeout: 2000, // Interval in ms for the progress reports (default: 1000)
    allowWebm: false,
  });

  // dowloaderMp3.getMp3("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  // dowloaderMp3.getMp3("https://www.youtube.com/watch?v=4N1iwQxiHrs");
  list.forEach((id) => {
    console.log(folder + "/" + id + ".mp3");
    if (!fs.existsSync(folder + "/" + id + ".mp3")) {
      try {
        dowloaderMp3.getMp3(id);
      } catch (err) {
        console.log("error downloading: ", id);
      }
    }
  });
}
