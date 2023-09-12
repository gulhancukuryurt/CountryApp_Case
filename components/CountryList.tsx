import React, { useState, useEffect } from "react";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedValue, setSelectedValue] = useState<number>(10); 

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedValue(Number(event.target.value));
    };
  
  const filterCountries = (query: string) => {
    if (!data || !data.countries) {
      return [];
    }
    return data.countries.filter((country: Country) =>
      country.name.toLowerCase().includes(query.toLowerCase())
    );
  };

  useEffect(() => {
    const filtered = filterCountries(searchQuery);
    setFilteredCountries(filtered);
  }, [searchQuery, data]);

  
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

  const paginatedCountries: Country[] = filteredCountries.slice(
    (currentPage - 1) * selectedValue,
    currentPage * selectedValue
  );
   
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };



  return (
    <div>
      <div className="max-w-full flex justify-center align-top mx-auto items-center flex-wrap mb-4 mt-4 ">
        <input
          type="search"
          className="relative m-0 block w-[1px] min-w-0 flex-auto rounded border border-solid ml-10 border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="button-addon2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <span
          className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
          id="basic-addon2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        <select value={selectedValue.toString()} onChange={handleChange} className="w-28 ml-52 mr-10 text-center">
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
        <option value="50">50</option>

      </select>
      </div>
      <div className="max-w-full bg-slate-700 p-4">
        <h1 className="text-center text-2xl text-white tracking-widest">COUNTRY LİST</h1>
      </div>
      <span className="flex justify-end m-2">{data.countries.length} countries listed </span>

      <div className="max-w-full flex flex-wrap justify-center mt-5">
        {paginatedCountries.map((country: Country) => (
          <div
            key={country.code}
            className={`flex flex-col border-2 text-center justify-center w-56 h-48 bg-slate-400 bg-opacity-20 hover:bg-opacity-75 focus:border-red-400 transform duration-300 m-2 p-2 cursor-pointer hover:-translate-y-1 ${
              clickedCountry === country.code ? "bg-slate-300 border-neutral-400" : ""
            }`}
            onClick={() => handleCountryClick(country.code)}
          >
            <span className={`transform translate-y-30 duration-300 border-b-4 tracking-widest border-neutral-600 font-semibold
           ${
            clickedCountry === country.code ? "border-gray-600" : ""
           } `}>
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
          <FaAngleDoubleLeft className="mr-2" /> Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage * selectedValue >= filteredCountries.length}
          className="bg-blue-500 flex flex-row items-center text-white px-4 py-2 rounded-lg disabled:bg-blue-300 disabled:cursor-not-allowed hover:bg-blue-600"
        >
          Next <FaAngleDoubleRight className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default CountryList;
