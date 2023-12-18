import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-dark text-white">
        <Link class="navbar-brand text-white p-2" to="#">
          BookStore
        </Link>
      </nav>
    </div>
  );
}
