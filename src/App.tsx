import React, { Suspense } from 'react';
{{#if router}}
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import routes from './routes';
{{/if}}
function App() {
  return (
    <div className='App'>
      {{#if router}}
      <Router>
        <Switch>
          {routes.map((route, i) => (
            <Route
              key={i}
              path={route.path}
              render={() => (
                // 防其组件树中的某些子组件尚未具备渲染条件
                // 与React.lazy 搭配使用
                <Suspense fallback={<div>loading</div>}>
                  <route.component />
                </Suspense>
              )}
            />
          ))}
        </Switch>
      </Router>
      {{/if}}
    </div>
  );
}

export default App;
