import { groupBy } from "lodash";
import * as React from "react";
import Page from "../components/Page";
import PageCard from "../components/PageCard";
import { ColorInfo, getColorInfo } from "../styles/tailwindColors";

const sizes = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

export default function Palette(): React.ReactElement {
  const colors = groupBy(getColorInfo(), "name");
  const colorNames = Object.entries(colors);
  return (
    <Page>
      <PageCard pageType="stylized" className="p-2 lg:p-8">
        <div className="p-4">
          {colorNames.map(([color, values]) => {
            return (
              <>
                <div className={`font-bold text-${color}-700`}>{color}</div>
                <div className="grid shadow mb-4 lg:grid-cols-10 sm:grid-cols-5 grid-cols-2">
                  {values.map((value) => {
                    return <ColorBlock info={value} />;
                  })}
                </div>
              </>
            );
          })}
        </div>
      </PageCard>
    </Page>
  );
}

function ColorBlock({
  info: { name: color, weight: value, hex },
}: {
  info: ColorInfo;
}): React.ReactElement {
  const textValue = value > 500 ? 300 : value > 300 ? 800 : 600;
  return (
    <div
      className={`h-10 bg-${color}-${value} grid place-items-center hover:bg-${color}-${textValue} text-${color}-${textValue} hover:text-${color}-${value}`}
    >
      <span className={`inline-block text-xs`}>{hex.toUpperCase()}</span>
    </div>
  );
}
