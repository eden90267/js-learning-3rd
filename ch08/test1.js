// 陣列常值
const arr1 = [1, 2 ,3];
const arr2 = ["one", 2, "three"];
const arr3 = [[1 ,2, 3], ["one", 2, "three"]];
const arr4 = [
  {name: "Fred", type: "object", luckyNumbers: [5, 7, 13]},
  [
    {name: "Susan", type: "object"},
    {name: "Anthony", type: "object"}
  ],
  1,
  function() {return "arrays can contain functions too";},
  "three",
];

// 存取元素
arr1[0];
arr1[2];
arr3[1];
arr4[1][0];

// 陣列長度
arr1.length;
arr4.length;
arr4[1].length;

// 增加陣列大小
arr1[4] = 5;
arr1;
arr1.length;

// 存取(不是指派)比陣列大的索引，"不會"改變陣列大小
arr2[10];
arr2.length;

// Array建構式(很少用)
const arr5 = new Array();        // 空陣列
const arr6 = new Array(1, 2, 3); // [1, 2, 3]
const arr7 = new Array(2);       // 長度為2的陣列(all元素都是undefined)
const arr8 = new Array("2");     // ["2"]