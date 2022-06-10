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
    <Page pageType="stylized">
      <PageCard>
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

function round(number: number, modulo: number = 100) {
  const mod = number % modulo;
  return number - mod;
}

function ColorBlock({
  info: { name: color, weight: value },
}: {
  info: ColorInfo;
}): React.ReactElement {
  let textValue;
  if (value < 600) {
    textValue = Math.min(900, round(value + 600));
  } else {
    textValue = Math.max(50, round(value - 600));
  }

  return (
    <div
      className={`h-10 bg-${color}-${value} grid place-items-center text-${color}-${textValue}`}
    >
      <span className={`inline-block font-bold text-xs lg:text-[.5rem]`}>
        {color}-{value}
      </span>
    </div>
  );
}
