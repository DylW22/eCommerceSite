import React from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";

const About = () => <div>You are on the about page</div>;
const Home = () => <div>You are home</div>;
const NoMatch = () => <div>No match</div>;

export const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid="location-display">{location.pathname}</div>;
};

export const App2 = () => {
  <div>
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>o
  </div>;
};
