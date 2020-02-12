import React, { useState, useEffect, useRef } from "react";
import "./SortVisualizer.css";
import { getMergeSortAnimations } from "../algorithms/MergeSort";

const ARR_LEN = 100;
const MIN_NUM = 5;
const MAX_NUM = 80;
const DELAY = 5;
const ACCESSED_COLOUR = "blue";

export default function SortVisualizer(props) {
  const [arr, setArr] = useState([]);
  const containerRef = useRef(null);

  useEffect(initialiseArray, []);

  function initialiseArray() {
    const arr = [];
    for (let i = 0; i < ARR_LEN; i++) {
      arr.push(randIntRange(MIN_NUM, MAX_NUM));
    }
    setArr(arr);
  }

  function mergeSort() {
    const animations = getMergeSortAnimations(arr);
    animations.forEach(([comparison, swapped], index) => {
      if (!swapped) {
        if (comparison.length === 2) {
          const [i, j] = comparison;
          setTimeout(() => {
            animateArrayAccess(i);
            animateArrayAccess(j);
          }, index * DELAY);
        } else {
          const [i] = comparison;
          animateArrayAccess(i);
        }
      } else {
        setTimeout(() => {
          setArr(prevArr => {
            const [k, newValue] = comparison;
            const newArr = [...prevArr];
            newArr[k] = newValue;
            return newArr;
          });
        }, index * DELAY);
      }
    });
  }

  function insertionSort() {}

  function animateArrayAccess(index) {
    const arrayBars = containerRef.current.children;
    const arrayBarStyle = arrayBars[index].style;
    setTimeout(() => {
      arrayBarStyle.backgroundColor = ACCESSED_COLOUR;
    }, DELAY);
    setTimeout(() => {
      arrayBarStyle.backgroundColor = "";
    }, DELAY * 2);
  }

  return (
    <>
      <div className="array-container" ref={containerRef}>
        {arr.map((barHeight, index) => (
          <div
            className="array-bar"
            style={{ height: `${barHeight}vmin` }}
            key={index}
          ></div>
        ))}
      </div>
      <footer>
        <button className="app-button" onClick={initialiseArray}>
          Create new array
        </button>
        <button className="app-button" onClick={mergeSort}>
          Merge sort
        </button>
        <button className="app-button" onClick={insertionSort}>
          Insertion sort
        </button>
      </footer>
    </>
  );
}

const randIntRange = (start, end) =>
  Math.floor(Math.random() * (end - start + 1) + start);
