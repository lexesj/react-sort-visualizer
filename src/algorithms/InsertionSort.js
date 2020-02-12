import { swap } from "./Utility";

export function getInsertionSortAnimations(arr) {
  const copy = [...arr];
  const animations = [];
  for (let i = 1; i < copy.length; i++) {
    for (let j = i - 1; j >= 0; j--) {
      animations.push([[j, j + 1], false]);
      if (copy[j + 1] < copy[j]) {
        animations.push([[j, copy[j + 1]], true]);
        animations.push([[j + 1, copy[j]], true]);
        swap(copy, j, j + 1);
      } else break;
    }
  }
  return animations;
}
