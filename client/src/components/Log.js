import React from 'react';
import PreviewCard from './PreviewCard';

const Log = () => (
  <>
    <div className="custom-scroll h-screen overflow-scroll flex-1 xl:flex-auto xl:max-w-screen-sm overflow-x-hidden">
      <section className="grid grid-cols-1 gap-3 p-5 auto-rows-min min-h-full">
        <PreviewCard />
        <PreviewCard />
        <PreviewCard />
        <PreviewCard />
        <PreviewCard />
        <PreviewCard />
        <PreviewCard />
        <PreviewCard />
        <PreviewCard />
        <PreviewCard />
        <PreviewCard />
        <PreviewCard />
        <PreviewCard />
      </section>
    </div>
  </>
);

export default Log;
