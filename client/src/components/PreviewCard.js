import React from 'react';
import { Link } from 'react-router-dom';

const PreviewCard = () => (
  <>
    <Link to="/">
      <article className="group relative container flex items-end overflow-hidden h-32 p-5 rounded cursor-pointer cover-img max-h-48">
        <header className="relative z-10 card-header">
          <p className="text-red-400 text-sm">November 17</p>
          <h2 className="text-2xl text-gray-50">San Francisco</h2>
        </header>
        <img
          className="absolute m-auto inset-0 text-center object-cover object-center z-0  group-hover:cover-img"
          src="https://www.flytap.com/-/media/Flytap/new-tap-pages/destinations/north-america/united-states/san-francisco/destinations-san-francisco-banner-mobile-1024x553.jpg"
          alt="img"
        />
        <span className="absolute top-2 right-2 bg-red-400 rounded px-2 py-1 text-xs text-white bg-opacity-50 font-bold">
          France
        </span>
      </article>
    </Link>
  </>
);

export default PreviewCard;
