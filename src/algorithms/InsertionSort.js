import { swap } from "./Utility";

export function getInsertionSortAnimations(arr) {
  const copy = arr.slice();
  const animations = [];
  for (let i = 1; i < copy.length; i++) {
    for (let j = i - 1; j >= 0; j--) {
      animations.push([[j, j + 1], false]);
      if (copy[j + 1] < copy[j]) {
        swap(copy, j, j + 1);
        animations.push([[j, j + 1], true]);
      } else break;
    }
  }
  return animations;
}
