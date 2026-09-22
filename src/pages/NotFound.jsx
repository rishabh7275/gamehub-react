import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="container">

      <div className="not-found">

        <div className="not-found-icon">
          🚫
        </div>

        <h1>404</h1>

        <h2>Page Not Found</h2>

        <p>
          The page you're looking for
          doesn't exist.
        </p>

        <Link
          to="/"
          className="btn"
        >
          🏠 Go Home
        </Link>

      </div>

    </main>
  );
}

export default NotFound;