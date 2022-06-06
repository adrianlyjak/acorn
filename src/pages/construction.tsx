import * as React from "react";
import { InteractiveEmoji } from "../components/InteractiveEmoji";
import Page from "../components/Page";
import PageCard from "../components/PageCard";
export default function UnderConstruction(props: any) {
  return (
    <Page>
      <PageCard pageType="stylized">
        <h1>Sorry!</h1>
        <h2>This site is under construction</h2>
        <div className="flex justify-center items-center">
          <InteractiveEmoji />
        </div>
      </PageCard>
    </Page>
  );
}
