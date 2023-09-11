import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import LIST_COUNTRIES from "../pages/countryquery"; 
import { FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/fa";

interface Country {
  code: string;
  name: string;
  capital: string;
  languages: { name: string }[];
}

const CountryList: React.FC = () => {
  const { loading, error, data } = useQuery(LIST_COUNTRIES);
  const [clickedCountry, setClickedCountry] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 10;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data || !data.countries) {
    return <p>No data available</p>;
  }

  const handleCountryClick = (code: string) => {
    if (clickedCountry === code) {
      setClickedCountry(null);
    } else {
      setClickedCountry(code);
    }
  };

  const paginatedCountries: Country[] = data.countries.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <div className="max-w-full bg-slate-700 p-4">
        <h1 className="text-center text-xl text-white">Country List</h1>
      </div>
      <div className="max-w-full flex flex-wrap justify-center">
        {paginatedCountries.map((country: Country) => ( 
          <div
            key={country.code}
            className={`flex flex-col border-2 text-center justify-center w-56 h-48 bg-slate-400 bg-opacity-20 hover:bg-opacity-75 transform duration-300 m-2 p-2 cursor-pointer 
            ${clickedCountry === country.code ? "bg-slate-300" : "" }`} 
            onClick={() => handleCountryClick(country.code)}
          >
            <span className="transform translate-y-30 duration-300 border-b-4 border-neutral-600 font-medium">
              {country.name.toUpperCase()}
            </span>
            {clickedCountry === country.code && (
              <div>
                <p className="text-slate-500 text-lg hover:opacity-90 transform duration-500">
                  Capital: {country.capital}
                </p>
                <p className="text-slate-500 text-lg hover:opacity-90 transform duration-500">
                  Languages:{" "}
                  {country.languages.map((language) => language.name)}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-blue-500 flex flex-row items-center text-white px-4 py-2 rounded-lg mr-2 disabled:bg-blue-300 disabled:cursor-not-allowed hover:bg-blue-600"
        >
          
          <FaAngleDoubleLeft className="mr-2"/> Previous 
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage * PAGE_SIZE >= data.countries.length}
          className="bg-blue-500 flex flex-row items-center text-white px-4 py-2 rounded-lg disabled:bg-blue-300 disabled:cursor-not-allowed hover:bg-blue-600"
        >
          Next <FaAngleDoubleRight className="ml-2"/>
        </button>
      </div>
    </div>
  );
};

export default CountryList;
