/**
 * Created by eden90267 on 2017/3/17.
 */
'use strict';
// es6功能：區塊範圍的"let宣告"
const sentences = [
    {subject: 'JavaScript', verb: 'is', object: 'great'},
    {subject: 'Cats', verb: 'are', object: 'cute'},
];
// es6功能：物件解構
function say({subject, verb, object}) {
    // es6功能：範本字串
    console.log(`${subject} ${verb} ${object}`);
}
// es6功能：for..of
for (let s of sentences) {
    say(s);
}