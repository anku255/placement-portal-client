import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="container landing">
      <section class="hero is-large has-text-centered">
        <div class="hero-body">
          <div class="container">
            <h1 class="title is-size-1">
              Welcome to IIIT Kalyani Placement Portal
            </h1>
            <h2 class="subtitle is-size-3">
              <Link to="/cv">Click Here</Link> to manage your CV
            </h2>
          </div>
        </div>
      </section>
    </div>
  );
}
