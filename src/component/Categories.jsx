import React from "react";

const Categories = ({ catApi, setCat }) => {
  return (
    <>
      <div className="mt-5 shadow-lg rounded-lg">
        <div>
          <ul className="border border-gray-300 rounded-lg overflow-hidden shadow-lg bg-white">
            <li
              onClick={() => setCat(undefined)}
              className="cursor-pointer px-4 py-3 bg-gradient-to-r from-gray-900 to-gray-700 text-white hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-600 transition-all duration-300 ease-in-out text-center rounded-t-lg font-semibold border-b-2"
            >
              Clear All
            </li>
            {catApi.map((v, i) => (
              <li
                key={i}
                onClick={() => setCat(v.url)}
                className="cursor-pointer px-4 py-3 bg-gradient-to-r from-gray-900 to-gray-700 hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-600 transition-all duration-300 ease-in-out text-center text-white font-medium border-b last:border-none border-gray-200"
              >
                {v.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Categories;
