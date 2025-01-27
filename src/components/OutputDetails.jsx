const OutputDetails = ({ outputDetails }) => {
  return (
    <div className="metrics-container mt-4 flex flex-col space-y-3">
      <p className="text-sm font-medium">
        Status:{" "}
        <span className="font-semibold px-3 py-1 rounded-lg bg-blue-500 text-white">
          {outputDetails?.status?.description}
        </span>
      </p>
      <p className="text-sm font-medium">
        Memory:{" "}
        <span className="font-semibold px-3 py-1 rounded-lg bg-blue-500 text-white">
          {outputDetails?.memory}
        </span>
      </p>
      <p className="text-sm font-medium">
        Time:{" "}
        <span className="font-semibold px-3 py-1 rounded-lg bg-blue-500 text-white">
          {outputDetails?.time}
        </span>
      </p>
    </div>
  );
};

export default OutputDetails;
