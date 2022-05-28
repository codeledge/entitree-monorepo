// @ts-nocheck
import * as React from "react";

import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import CardWithIcon from "./CardWithIcon";
import ImageIcon from "@mui/icons-material/Image";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import { useTranslate } from "react-admin";

interface Props {
  // value?: string;
}
const Spacer = () => <span style={{ width: "1em" }} />;

const NumberStats = (props: Props) => {
  // const { value } = props;
  const translate = useTranslate();
  const [total, setTotal] = React.useState(null);

  React.useEffect(() => {
    axios
      .get("/api/image_stats")
      .then((res) => {
        const data = res.data;
        setTotal(data.stats);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {total && (
        <>
          <CardWithIcon
            to="/commands"
            icon={AccessibilityNewIcon}
            title={translate("pos.dashboard.api")}
            subtitle={"Functional"}
          />
          <Spacer />
          <CardWithIcon
            to="/commands"
            icon={ImageIcon}
            title={translate("pos.dashboard.total_images")}
          />
          <Spacer />

          <CardWithIcon
            to="/commands"
            icon={VisibilityIcon}
            title={translate("pos.dashboard.face_detection")}
            subtitle={total.googleCloudVisionFaceDetection}
          />
          <Spacer />
          <CardWithIcon
            to="/commands"
            icon={VisibilityIcon}
            title="Background Removals"
            subtitle={total.backgroundRemoval}
          />
          <Spacer />
          <CardWithIcon
            to="/commands"
            icon={VisibilityIcon}
            title={translate("pos.dashboard.total_image_views")}
            subtitle={total.apiCalled}
          />
        </>
      )}
    </>
  );
};

export default NumberStats;
