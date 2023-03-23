import React, { useEffect, useState, Suspense, lazy } from "react";
import "./styles.css";
const SampleComponent = lazy(() => import("./SampleComponent"));

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [valueToSend, setValueToSend] = useState("");
  const [data, setData] = useState([]);

  const loadComponentOnClick = () => {
    setValueToSend(inputValue);
  };

  const add = (arg1) => {
    return function (arg2) {
      return arg1 + arg2;
    };
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((response) => setData(response));
  }, []);

  const onClickDeleteEntry = (user) => {
    let userData = [...data];
    const index = userData.findIndex((entry) => entry.id === user.id);
    console.log("index: ", index);
    if (index > -1) {
      userData.splice(index, 1);
    }
    setData(userData);
  };

  return (
    <div className="App">
      <div>{add(2)(3)}</div>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={loadComponentOnClick}>Click</button>
      <Suspense fallback={<div>Loading...</div>}>
        <SampleComponent value={valueToSend} />
      </Suspense>

      {data.length &&
        data.map((userData) => {
          return (
            <div>
              <span key={userData.id}>{userData.email}</span>
              <button onClick={() => onClickDeleteEntry(userData)}>
                delete
              </button>
            </div>
          );
        })}
    </div>
  );
}
