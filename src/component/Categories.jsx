import React from "react";

const Categories = ({ catApi, setCat }) => {
  // console.log(catApi);

  return (
    <>
      <div className="mt-5 shadow-lg shadow-[#f2f2f2]-500/50">
        <div>
          <ul className="border border-black-200 rounded overflow-hidden shadow-md">
            <li
              onClick={() => setCat(undefined)}
              className=" cursor-pointer px-4 py-2 bg-black hover:bg-[#ccc] hover:text-sky-900 border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out"
            >
              Clear All
            </li>
            {catApi.map((v, i) => {
              return (
                <>
                  <li
                    onClick={() => setCat(v.url)}
                    className=" cursor-pointer px-4 py-2 bg-black hover:bg-[#ccc] hover:text-sky-900 border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out"
                  >
                    {v.name}
                  </li>
                </>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Categories;
