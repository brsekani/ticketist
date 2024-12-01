import Link from "next/link";

function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-100 sm:px-8">
      <h1 className="mb-4 text-6xl font-extrabold text-gray-800 sm:text-7xl md:text-8xl">
        404
      </h1>
      <p className="mb-6 text-lg text-center text-gray-600 sm:text-xl md:mb-8">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link
        href="/"
        className="inline-block px-6 py-2 text-lg font-semibold text-white transition-transform duration-200 rounded-lg shadow-md hover:scale-105 sm:px-8 sm:py-4 md:px-10 md:py-3"
        style={{
          backgroundColor: "#32BC9B",
        }}
      >
        Go Back Home
      </Link>
    </main>
  );
}

export default NotFound;
