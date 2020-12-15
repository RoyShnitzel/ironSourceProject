import React, { lazy, Suspense, useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ErrorBoundary from "./Components/ErrorBoundary";
import Loading from "./Components/Loading/Loading.js";
import NavBar from "./Components/NavBar";

const MainPage = lazy(() => import("./AppPages/mainPage"));
const CampaignForm = lazy(() => import("./AppPages/campaignForm"));
const NotFound = lazy(() => import("./Components/NotFound"));

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <ErrorBoundary>
            <NavBar />
            <Switch>
              <Route exact path="/campaignForm">
                <CampaignForm />
              </Route>
              <Route exact path="/">
                <MainPage />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </ErrorBoundary>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
