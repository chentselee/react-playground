import { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Home } from "src/features/Core/routes";
import {
  Actors,
  JotaiMachine,
  ReactQuery,
  StateManagement,
  UseEffectReducer,
} from "src/features/PlayGround/routes";

export default function App() {
  return (
    <Suspense fallback={<div></div>}>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/playground">
          <StateManagement />
        </Route>
        <Route exact path="/playground/actors">
          <Actors />
        </Route>
        <Route exact path="/playground/jotai-machine">
          <JotaiMachine />
        </Route>
        <Route exact path="/playground/react-query">
          <ReactQuery />
        </Route>
        <Route exact path="/playground/state-management">
          <StateManagement />
        </Route>
        <Route exact path="/playground/use-effect-reducer">
          <UseEffectReducer />
        </Route>
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </Suspense>
  );
}
