"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GlobalError({ error, reset }) {
  const router = useRouter();

  useEffect(() => {
    console.error("An error occurred:", error);
  }, [error]);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-center p-4">
      <h2 className="text-danger fw-bold">Something went wrong!</h2>
      <p className="text-muted">{error.message || "An unexpected error occurred."}</p>
      <div className="mt-4 d-flex gap-3">
        <button className="btn btn-primary" onClick={() => reset()}>
          Try Again
        </button>
        <button className="btn btn-secondary" onClick={() => router.push("/")}>
          Go Home
        </button>
      </div>
    </div>
  );
}
