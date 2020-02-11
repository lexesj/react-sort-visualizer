import React, { Component } from "react";
import "./SortVisualizer.css";

const ARR_LEN = 100;
const MIN_NUM = 5;
const MAX_NUM = 1000;

export default class SortVisualizer extends Component {
  constructor(props) {
    super(props);

    this.state = { arr: [] };
    this.initialiseArray = this.initialiseArray.bind(this);
    this.mergeSort = this.mergeSort.bind(this);
    this.insertionSort = this.insertionSort.bind(this);
  }

  componentDidMount() {
    this.initialiseArray();
  }

  initialiseArray() {
    const arr = [];
    for (let i = 0; i < ARR_LEN; i++) {
      arr.push(randIntRange(MIN_NUM, MAX_NUM));
    }
    this.setState({
      arr: arr
    });
  }

  mergeSort() {
    const copy = this.state.arr.slice();
    const len = copy.length;
    const aux = Array(len);
    this.mergeSortHelper(copy, aux, 0, len - 1);
    this.setState({
      arr: copy
    });
  }

  mergeSortHelper(arr, aux, left, right) {
    if (right <= left) return;
    const mid = left + Math.floor((right - left) / 2);
    this.mergeSortHelper(arr, aux, left, mid);
    this.mergeSortHelper(arr, aux, mid + 1, right);
    this.merge(arr, aux, left, mid, right);
  }

  merge(arr, aux, left, mid, right) {
    for (let i = left; i <= right; i++) aux[i] = arr[i];
    let i = left;
    let j = mid + 1;
    for (let k = left; k <= right; k++) {
      if (i > mid) arr[k] = aux[j++];
      else if (j > right) arr[k] = aux[i++];
      else if (aux[j] < aux[i]) arr[k] = aux[j++];
      else arr[k] = aux[i++];
    }
  }

  insertionSort() {
    const copy = this.state.arr.slice();
    for (let i = 1; i < copy.length; i++) {
      for (let j = i - 1; j >= 0; j--) {
        if (copy[j + 1] < copy[j]) swap(copy, j, j + 1);
        else break;
      }
    }
    this.setState({
      arr: copy
    });
  }

  render() {
    return (
      <>
        <div className="array-container">
          {this.state.arr.map((bar, index) => (
            <div className="array-bar" key={index}>
              {bar}
            </div>
          ))}
          <button onClick={this.initialiseArray}>Create new array</button>
          <button onClick={this.mergeSort}>Merge sort</button>
          <button onClick={this.insertionSort}>Insertion sort</button>
        </div>
      </>
    );
  }
}

const randIntRange = (start, end) =>
  Math.floor(Math.random() * (end - start + 1) + start);

const swap = (arr, index1, index2) => {
  const temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
};
