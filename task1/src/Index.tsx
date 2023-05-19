import React, { FC, useState, useEffect } from "react";

interface Results {
  address_line1: string;
  result_type: string;
}

const Index: FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [addressList, setAddressList] = useState<Results[]>([]);
  const [hideDropdown, setHideDropdown] = useState<object>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setHideDropdown({});
  };

  const apiKey = "11da404667ca45a78db6a73c3b6be0d9";
  const baseUrl: string = `https://api.geoapify.com/v1/geocode/autocomplete?text=${inputValue}&format=json&apiKey=${apiKey}&limit=3&filter=countrycode:pl&lang=pl`;

  const getData = async () => {
    try {
      const response = await fetch(baseUrl);
      if (!response.ok) {
        throw new Error("Data could not be fetched!");
      }
      const data = await response.json();
      setAddressList(data.results);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (inputValue) {
      getData();
    } else {
      setAddressList([]);
    }
  }, [inputValue]);

  const handleSetData = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    setInputValue(`${e.currentTarget.id}`);
    setHideDropdown({ display: "none" });
  };

  return (
    <>
      <h1 className="absolute top-1/4 left-1/4 font-semibold text-2xl sm:left-1/3">
        Miasto:
      </h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Wprowadź adres"
        className="border-blue-500 px-5 py-2 border-2 h-9 w-52 rounded-2xl focus:border-blue-200 absolute top-1/3 left-1/2 transform translate-x-[-50%]"
      />
      {inputValue && addressList.length > 0 && (
        <div
          style={hideDropdown}
          className="mt-10 text-black w-52 h-fit border-gray-500 absolute top-1/3 border-2 left-1/2 transform translate-x-[-50%] px-5 py-2"
        >
          <ul>
            {addressList &&
              addressList.map((result, idx) => (
                <li
                  key={idx}
                  className="cursor-pointer"
                  onClick={handleSetData}
                  id={`${result.address_line1}`}
                >
                  {result.result_type === "city" ? result.address_line1 : null}
                </li>
              ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Index;
