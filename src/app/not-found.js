import Link from "next/link";
import "./not-found.scss";

export default function NotFound() {
  return (
    <main className="not-found">
      <div className="not-found-container">
        <h1 className="not-found-title text-black">404</h1>
        <h2 className="not-found-subtitle text-black">Oops! Page Not Found</h2>
        <p className="not-found-description text-black">
          The page you`re looking for doesn`t exist or has been moved. Let`s get
          you back to the homepage.
        </p>
        <Link href="/" className="not-found-link btn btn-primary">
          Go To Home
        </Link>
      </div>
    </main>
  );
}
