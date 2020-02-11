import React, { useState, useEffect } from "react";
import "./SortVisualizer.css";

const ARR_LEN = 100;
const MIN_NUM = 5;
const MAX_NUM = 80;

export default function SortVisualizer(props) {
  const [arr, updateArr] = useState([]);

  useEffect(initialiseArray, []);

  function initialiseArray() {
    const arr = [];
    for (let i = 0; i < ARR_LEN; i++) {
      arr.push(randIntRange(MIN_NUM, MAX_NUM));
    }
    updateArr(arr);
  }

  function mergeSort() {
    const copy = arr.slice();
    const len = copy.length;
    const aux = Array(len);
    const animations = [];
    mergeSortHelper(copy, aux, 0, len - 1, animations);
    updateArr(copy);
    return animations;
  }

  function mergeSortHelper(arr, aux, left, right, animations) {
    if (right <= left) return;
    const mid = left + Math.floor((right - left) / 2);
    mergeSortHelper(arr, aux, left, mid, animations);
    mergeSortHelper(arr, aux, mid + 1, right, animations);
    merge(arr, aux, left, mid, right, animations);
  }

  function merge(arr, aux, left, mid, right, animations) {
    for (let i = left; i <= right; i++) aux[i] = arr[i];
    let i = left;
    let j = mid + 1;
    for (let k = left; k <= right; k++) {
      animations.push([i, j]);
      if (i > mid) arr[k] = aux[j++];
      else if (j > right) arr[k] = aux[i++];
      else if (aux[j] < aux[i]) arr[k] = aux[j++];
      else arr[k] = aux[i++];
      animations.push(k);
    }
  }

  function insertionSort() {
    const copy = arr.slice();
    for (let i = 1; i < copy.length; i++) {
      for (let j = i - 1; j >= 0; j--) {
        if (copy[j + 1] < copy[j]) swap(copy, j, j + 1);
        else break;
      }
    }
    updateArr(copy);
  }

  return (
    <>
      <div className="array-container">
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
        <button className="app-button" id="merge-sort" onClick={mergeSort}>
          Merge sort
        </button>
        <button
          className="app-button"
          id="insertion-sort"
          onClick={insertionSort}
        >
          Insertion sort
        </button>
      </footer>
    </>
  );
}

const randIntRange = (start, end) =>
  Math.floor(Math.random() * (end - start + 1) + start);

const swap = (arr, index1, index2) => {
  const temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
};
