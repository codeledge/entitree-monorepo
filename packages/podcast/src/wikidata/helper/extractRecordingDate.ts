// const strtotime = require("locutus/php/datetime/strtotime");

export function extractRecordingDate(text: string) {
  try {
    //only year
    let recorded = text.match(new RegExp("recorded in (20\\d{2})", "i"));

    if (recorded) {
      return {
        value: recorded[1] + "-00-00",
        statedAs: recorded[0],
      };
    }
    //only month and year
    recorded = text.match(
      new RegExp("recorded (in |)([a-zA-Z]+ 20\\d{2})", "i")
    );
    // console.log(recorded);
    // if (recorded) {
    //   let recordedMonth = new Date(strtotime(recorded[2] + " GMT+0000") * 1000);
    //   return {
    //     value: recordedMonth.toISOString().substring(0, 8) + "00",
    //     statedAs: recorded[0],
    //   };
    // }
    //full date
    recorded = text.match(
      new RegExp("recorded (on |)((.{4,22}) 20\\d{2})", "i")
    );
    // console.log(recorded);
    // if (recorded && recorded[2]) {
    //   let recordedDate = new Date(strtotime(recorded[2] + " GMT+0000") * 1000);
    //   return {
    //     value: recordedDate.toISOString().substring(0, 10),
    //     statedAs: recorded[0],
    //   };
    // }
  } catch (e) {
    return null;
  }
}
