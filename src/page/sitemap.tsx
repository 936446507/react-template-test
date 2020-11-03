import React from 'react';
import { Link } from 'react-router-dom';

import routes from 'src/routes';
function Sitemap() {
  return (
    <div className='sitemap'>
      <p>站点地图</p>
      <ul style={{ display: 'flex', justifyContent: 'center' }}>
        {routes.map((r, i) => (
          <li key={i} style={{ padding: '10px' }}>
            <Link style={{ color: '#61dafb' }} to={r.path}>
              {r.meta && r.meta.title ? r.meta.title : r.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sitemap;
