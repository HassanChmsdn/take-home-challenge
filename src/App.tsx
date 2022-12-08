import React, { useMemo, useState } from 'react';
import logo from './logo.svg';
import './App.css';


function App() {
  const [arr, setArr] = useState<number[]>([]);
  const [sum, setSum] = useState<number>(0);
  const [err, setErr] = useState('');


  const generateSet = () => {
    const tempArr = [];
    while (tempArr.length < 10) {
      let r = Math.floor(Math.random() * 100) + 1;
      if (tempArr.indexOf(r) === -1) tempArr.push(r);
    }
    var s = 0;
    tempArr.forEach(el => s = s + el)
    setSum(s);
    setArr(tempArr);
  };

  const submitSum = async () => {
    console.log("SUM", sum)
    const response = await fetch('https://superchat-challenge-numbers.free.beeceptor.com/sum', {
      method: 'POST',
      body: JSON.stringify({ "sum": sum }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    const result = await response.status;
    console.log('result is: ', result);
  };

  const renderCards = () => {
    return arr.map(el => {
      return (
        <div className='card rounded-none py-1.5 mb-5' key={"ran-" + el.toString()}>{el}</div>
      );
    });
  };

  return (
    <div className="App bg-blue-500	">
      <span className="justify-center text-white text-4xl">Take Home Challenge</span>
      <div className='place-content-center padding-bottom'>
        <button onClick={generateSet} className='rounded-full'>Generate Set</button>

      </div>

      <div className="container mx-auto">
        {renderCards()}
        <div className='card rounded-none py-1.5 mb-5' key={sum}>The Sum is: {sum}</div>
        <button onClick={submitSum} className='rounded-full'>Submit Sum</button>
      </div>



    </div>
  );
}

export default App;
