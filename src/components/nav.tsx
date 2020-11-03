import React from 'react';
import { Link } from 'react-router-dom';

import routes from 'src/routes';

function Nav() {
  return (
    <div className='nav'>
      <ul style={{ marginTop: '20px' }}>
        {routes.map((r, i) => (
          <li
            style={{
              display: 'inline-block',
              margin: '0 10px',
            }}
            key={i}>
            <Link to={r.path} style={{ color: '#61dafb' }}>
              {r.meta && r.meta.title ? r.meta.title : r.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Nav;
