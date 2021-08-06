/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from "react";
import { Route, Switch } from "react-router-dom";
import pluginId from "../../pluginId";

import Dashboard from "../Dashboard";

function App() {
  return (
    <Switch>
      <Route path={`/plugins/${pluginId}/`} component={Dashboard} />
    </Switch>
  );
}

export default App;
