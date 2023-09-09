import React from "react";
import {  useQuery } from "@apollo/client";
import LIST_COUNTRIES from "../pages/countryquery"; // Önceki adımda oluşturduğunuz sorgu

const CountryList: React.FC = () => {
    const { loading, error, data } = useQuery(LIST_COUNTRIES);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
  
    if (!data || !data.countries) {
      return <p>No data available</p>; 
    }
  
    return (
      <div>
        <h1>Country List</h1>
        <ul>
          {data.countries.map((country: any) => (
            <li key={country.code}>{country.name}</li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default CountryList;