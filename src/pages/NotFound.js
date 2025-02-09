const NotFound = () => {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="text-lg mt-2">Page Not Found</p>
      <a href="/" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
        Go Home
      </a>
    </main>
  );
};

export default NotFound;
