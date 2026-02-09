//Array con la funcion at

const array1 = [1,2,3];

console.log(array1.at(0)); //Imprime lo que este en la posicion 0 el cual es 1
console.log(array1.at(-1)); //Imprime la ultima posicion el cual es 3


//Array con la funcion concat
const array2 = [4,5,6];
const array3 = array1.concat(array2);
console.log(array3); // [1,2,3,4,5,6]

//Array con la funcion constructor
const array4 = [1,2,3];
console.log(array4.constructor); // [Function: Array]

//Array con la funcion copyWithin
const array5 = [1,2,3,4,5];
console.log(array5.copyWithin(0,3)); // [4,5,3,4,5]

//Array con la funcion entries
const array6 = ['a','b','c'];
const iterator1 = array6.entries();
console.log(iterator1.next().value); // [0, 'a']
console.log(iterator1.next().value); // [1, 'b']

//Array con la funcion every
const array7 = [1,2,3,4,5];
console.log(array7.every(x => x > 0)); // true
console.log(array7.every(x => x > 3)); // false

//Array con la funcion fill
const array8 = [1,2,3,4,5];
console.log(array8.fill(0,2,4)); // [1,2,0,0,5]

//Array con la funcion filter
const array9 = [1,2,3,4,5];
console.log(array9.filter(x => x > 3)); // [4,5]

//Array con la funcion find
const array10 = [1,2,3,4,5];
console.log(array10.find(x => x > 3)); // 4

//Array con la funcion findIndex
const array11 = [1,2,3,4,5];
console.log(array11.findIndex(x => x > 3)); // 3

//Array con la funcion findLast
const array12 = [1,2,3,4,5];
console.log(array12.findLast(x => x > 3)); // 5

//Array con la funcion findLastIndex
const array13 = [1,2,3,4,5];
console.log(array13.findLastIndex(x => x > 3)); // 4

//Array con la funcion flat
const array14 = [1,[2,3],[4,[5,6]]];
console.log(array14.flat()); // [1,2,3,4,[5,6]]
console.log(array14.flat(2)); // [1,2,3,4,5,6]

//Array con la funcion flatMap
const array15 = [1,2,3];
console.log(array15.flatMap(x => [x, x * 2])); // [1,2,2,4,3,6]

//Array con la funcion forEach
const array16 = ['a','b','c'];
array16.forEach((item, index) => {
  console.log(index, item);
});
// 0 'a'
// 1 'b'
// 2 'c'

//Array con la funcion from
const array17 = Array.from('hello');
console.log(array17); // ['h','e','l','l','o']

//Array con la funcion includes
const array18 = [1,2,3,4,5];
console.log(array18.includes(3)); // true
console.log(array18.includes(6)); // false

//Array con la funcion indexOf
const array19 = ['a','b','c','d'];
console.log(array19.indexOf('c')); // 2
console.log(array19.indexOf('z')); // -1

//Array con la funcion isArray
console.log(Array.isArray([1,2,3])); // true
console.log(Array.isArray('hello')); // false

//Array con la funcion join
const array20 = ['a','b','c'];
console.log(array20.join('-')); // 'a-b-c'
console.log(array20.join(', ')); // 'a, b, c'

//Array con la funcion keys
const array21 = ['a','b','c'];
const iterator2 = array21.keys();
console.log(iterator2.next().value); // 0
console.log(iterator2.next().value); // 1
console.log(iterator2.next().value); // 2

//Array con la funcion lastIndexOf
const array22 = [1,2,3,2,1];
console.log(array22.lastIndexOf(2)); // 3
console.log(array22.lastIndexOf(1)); // 4

//Array con la propiedad length
const array23 = [1,2,3,4,5];
console.log(array23.length); // 5

//Array con la funcion map
const array24 = [1,2,3,4,5];
console.log(array24.map(x => x * 2)); // [2,4,6,8,10]

//Array con la funcion pop
const array25 = [1,2,3,4,5];
console.log(array25.pop()); // 5
console.log(array25); // [1,2,3,4]

//Array con la funcion push
const array26 = [1,2,3];
array26.push(4,5);
console.log(array26); // [1,2,3,4,5]

//Array con la funcion reduce
const array27 = [1,2,3,4,5];
console.log(array27.reduce((sum, x) => sum + x, 0)); // 15

//Array con la funcion reduceRight
const array28 = [1,2,3,4,5];
console.log(array28.reduceRight((sum, x) => sum + x, 0)); // 15

//Array con la funcion reverse
const array29 = [1,2,3,4,5];
console.log(array29.reverse()); // [5,4,3,2,1]

//Array con la funcion shift
const array30 = [1,2,3,4,5];
console.log(array30.shift()); // 1
console.log(array30); // [2,3,4,5]

//Array con la funcion slice
const array31 = [1,2,3,4,5];
console.log(array31.slice(1,3)); // [2,3]
console.log(array31.slice(2)); // [3,4,5]

//Array con la funcion some
const array32 = [1,2,3,4,5];
console.log(array32.some(x => x > 4)); // true
console.log(array32.some(x => x > 10)); // false

//Array con la funcion sort
const array33 = [3,1,4,1,5,9,2,6];
console.log(array33.sort((a,b) => a - b)); // [1,1,2,3,4,5,6,9]

//Array con la funcion splice
const array34 = [1,2,3,4,5];
array34.splice(2,1,'a','b');
console.log(array34); // [1,2,'a','b',4,5]

//Array con la funcion toLocaleString
const array35 = [1,2,3];
console.log(array35.toLocaleString()); // '1,2,3'

//Array con la funcion toString
const array36 = [1,2,3];
console.log(array36.toString()); // '1,2,3'

//Array con la funcion unshift
const array37 = [3,4,5];
array37.unshift(1,2);
console.log(array37); // [1,2,3,4,5]

//Array con la funcion values
const array38 = ['a','b','c'];
const iterator3 = array38.values();
console.log(iterator3.next().value); // 'a'
console.log(iterator3.next().value); // 'b'
console.log(iterator3.next().value); // 'c'