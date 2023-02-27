import "./App.css";
import { Btncomp } from "./Btncomp.js";
import { useState } from "react";
import abcd from "./asset/abcd.mp3";

const operator = ["+", "-", "*", "/", "%"];
function App() {
  const [str, setStr] = useState("");
  const [lastOperator, setLastOperator] = useState("");
  const [isPrank, setIsPrank] = useState(false);

  const setRealTimeDisplay = (val) => {
    isPrank && setIsPrank(false);
    if (val === "AC") {
      setStr("");
      return;
    }

    if (val === "C") {
      if (str.length) {
        setStr(str.slice(0, -1));
      }
      return;
    }

    if (val === "=") {
      let dtStr = str;
      const lastChar = dtStr[dtStr.length - 1];
      if (operator.includes(lastChar)) {
        //remove last char

        dtStr = str.slice(0, -1);
      }
      total(dtStr);
      return;
    }

    if (operator.includes(val)) {
      if (!str) {
        return;
      }

      //this is for (.) usecase
      setLastOperator(val);

      const lastChar = str[str.length - 1];
      if (operator.includes(lastChar)) {
        //remove last operator
        return setStr(str.slice(0, -1) + val);
      }
    }

    // let allowDot = true;
    // if (val === ".") {
    //   if (!allowDot) {
    //     return;
    //   }
    //   allowDot = false;
    // }

    // if (val === "." && !allowDot) str += val;

    if (val === ".") {
      if (lastOperator) {
        const operatorIndex = str.lastIndexOf(lastOperator);
        const lastNumberSet = str.slice(operatorIndex + 1);
        if (lastNumberSet.includes(".")) {
          return;
        }
      }
      if (!lastOperator && str.includes(".")) {
        return;
      }
    }

    setStr(str + val);
  };

  const total = (calculateStr) => {
    const extra = randomNumber();
    if (extra) {
      setIsPrank(true);
      music();
    }
    const ttl = eval(calculateStr) + extra;

    setStr(ttl.toString());
  };

  const randomNumber = () => {
    const num = Math.round(Math.random() * 10);
    return num <= 5 ? num : 0;
  };

  const music = () => {
    const audio = new Audio(abcd);
    audio.play();
  };
  const btns = [
    { label: str || "0.00", cls: isPrank ? "display prank" : "display" },
    { label: "AC", cls: "btn btn-ac" },
    { label: "C", cls: "btn btn-c" },
    { label: "%", cls: "btn btn-perc" },
    { label: "/", cls: "btn btn-divide" },
    { label: "1", cls: "btn btn-1" },
    { label: "2", cls: "btn btn-2" },
    { label: "3", cls: "btn btn-3" },
    { label: "4", cls: "btn btn-4" },
    { label: "5", cls: "btn btn-5" },
    { label: "6", cls: "btn btn-6" },
    { label: "7", cls: "btn btn-7" },
    { label: "8", cls: "btn btn-8" },
    { label: "9", cls: "btn btn-9" },
    { label: "0", cls: "btn btn-0" },
    { label: "0", cls: "btn btn-0" },
    { label: "*", cls: "btn btn-X" },
    { label: "+", cls: "btn btn-plus" },
    { label: "-", cls: "btn btn-minus" },
    { label: ".", cls: "btn btn-dot" },
    { label: "=", cls: "btn btn-equal" },
  ];

  return (
    <div class="wrapper">
      <div class="calculator">
        {btns.map((item, i) => (
          <Btncomp {...item} setRealTimeDisplay={setRealTimeDisplay} />
        ))}
      </div>

      <div class="circle"></div>
    </div>
  );
}

export default App;
