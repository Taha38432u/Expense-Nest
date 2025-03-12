function MainHeading({ content }) {
  return (
    <div className="text-center">
      <h1 className="inline-block border-b-4 border-b-blue-800 p-3 text-3xl sm:text-5xl font-semibold text-gray-100">
        {content}
      </h1>
    </div>
  );
}

export default MainHeading;
