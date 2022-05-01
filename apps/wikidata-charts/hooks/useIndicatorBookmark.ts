import { useEffect, useLayoutEffect } from "react";

import { IndicatorInfo } from "../src/sparql/queries";
import Router from "next/router";
import { getIndicatorByKey } from "../src/service/propertySearch";
import { useRouter } from "next/router";

export default function useIndicatorBookmark(
  indicator: IndicatorInfo | undefined,
  setIndicator: React.Dispatch<React.SetStateAction<IndicatorInfo | undefined>>
) {
  const router = useRouter();

  useLayoutEffect(() => {
    if (router.query.indicator) {
      let presetIndicator = getIndicatorByKey(router.query.indicator as string);
      setIndicator(presetIndicator);
    }
  }, [router.query.indicator, setIndicator]);

  useEffect(() => {
    if (indicator) {
      Router.push(
        {
          query: {
            ...Router.router?.query,
            indicator: indicator.code,
          },
        },
        undefined,
        {
          shallow: true,
        }
      );
    }
  }, [indicator]);
}
