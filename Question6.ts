/**
 * Write a generic function mergeArrays<T> that:
        - Takes two arrays of type T[]
        - Returns a merged array with unique items only
        - Works for any type (numbers, strings, objects with id)
 */

function mergeArrays<T>(arr1: T[], arr2: T[]): T[] {
  const combined = [...arr1, ...arr2];

  // Handle primitive arrays
  if (typeof combined[0] !== 'object') {
    return Array.from(new Set(combined));
  }

  // Handle object arrays (assumes objects have 'id' property)
  const map = new Map<any, T>();
  combined.forEach(item => map.set((item as any).id, item));
  return Array.from(map.values());
}

// Examples
console.log(mergeArrays([1,2,3], [2,3,4])); // [1,2,3,4]
console.log(mergeArrays([{id:1},{id:2}], [{id:2},{id:3}])); // [{id:1},{id:2},{id:3}]
