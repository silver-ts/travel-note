import React, { useState } from 'react';

import MenuIcon from '../shared/MenuIcon';
import PreviewCard from './PreviewCard';

const LogBar = () => {
  const [showBar, setShowBar] = useState(true);

  // Open or hide sidebar
  const toggleLogBar = () => {
    setShowBar(!showBar);
  };

  return (
    <>
      <aside
        className={`fixed top-0 right-0 transform transition-transform ${
          showBar ? 'translate-x-96' : 'translate-x-0'
        }`}>
        <button
          onClick={toggleLogBar}
          className="fixed bg-gray-100 rounded-full top-10 left-0 transform -translate-x-2/4 z-40">
          <MenuIcon className="fill-current text-gray-800" />
        </button>
        <div
          className={`custom-scroll h-screen overflow-y-scroll xl:max-w-screen-sm pl-5 bg-gray-300`}>
          <section className="grid grid-cols-1 gap-3 p-5 auto-rows-min min-h-full overflow-x-hidden w-96">
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
      </aside>
    </>
  );
};

export default LogBar;
