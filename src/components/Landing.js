import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="container landing">
      <section className="hero is-large has-text-centered">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-size-1">
              Welcome to IIIT Kalyani Placement Portal
            </h1>
            <h2 className="subtitle is-size-3">
              <Link to="/cv">Click Here</Link> to manage your CV
            </h2>
          </div>
        </div>
      </section>
    </div>
  );
}
