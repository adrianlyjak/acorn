import * as React from "react";
import { InteractiveEmoji } from "../components/InteractiveEmoji";
import Page from "../components/Page";
import PageCard from "../components/PageCard";
export default function UnderConstruction(props: any) {
  return (
    <Page pageType="stylized">
      <PageCard>
        <h1 className="text-8xl mb-3">Sorry!</h1>
        <h2 className="text-4xl">🚧 This site is under construction 🚧</h2>
        <div className="flex justify-center items-center">
          <InteractiveEmoji />
        </div>
      </PageCard>
    </Page>
  );
}
