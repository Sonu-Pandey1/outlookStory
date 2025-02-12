import Link from "next/link";
import "./PostNotFound.scss";

export default function PostNotFound() {
  return (
    <main className="post-not-found">
      <div className="post-not-found-container">
        <h1 className="post-not-found-title text-black">Post Not Found</h1>
        <h2 className="post-not-found-subtitle text-black">
          Oops! This post no longer exists.
        </h2>
        <p className="post-not-found-description text-black">
          The post you were looking for has either been deleted or doesn`t
          exist. Let`s get you back to the homepage For Another Posts.
        </p>
        <Link href="/" className="post-not-found-link btn btn-primary">
          Go To Home
        </Link>
      </div>
    </main>
  );
}
