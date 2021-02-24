import React from 'react';

import { EditIcon } from './icons';

const LogEntry = () => (
  <section className="absolute top-0 right-0 h-screen z-10 left-auto bottom-auto bg-slate-400 px-12 w-101 overflow-hidden">
    <div className="circle"></div>
    <header className="flex justify-between items-center pb-5 text-4xl mt-32">
      <h2>City name</h2>
      <EditIcon />
    </header>
    <div>
    At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.
    </div>
  </section>
);

export default LogEntry;
