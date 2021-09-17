const { test1, res1 , test2, res2, test3, res3 } = require('./tests');


function removeEvens(numbers) {
    return numbers.filter(n => n % 2 !== 0); 
}

function removeOdds(numbers) {
    return numbers.filter(n => n % 2 == 0); 
}

function sort1(arr) {
    //remove all even numbers from the array and sort the remaining elements in the increasing order
    const oddNumbers = removeEvens(arr);
    return oddNumbers.sort( (a,b) => a-b );
}

function sort2(arr) {
    //remove all odd numbers from the array and sort the remaining elements in the decreasing order
    const evenNumbers = removeOdds(arr);
    return evenNumbers.sort( (a,b) => b-a );
}


function sort3(arr) {
    //the even elements go first in increasing order, and then odd ones are in the descending order
    const evenNumbers = removeOdds(arr);
    evenNumbers.sort( (a,b) => a-b );
    const oddNumbers = removeEvens(arr);
    oddNumbers.sort( (a,b) => b-a );
    return evenNumbers.concat(oddNumbers);
}



function main () {
    let res = sort1(test1);
    console.assert(JSON.stringify(res1) === JSON.stringify(res));

    res = sort2(test2);
    console.assert(JSON.stringify(res2) === JSON.stringify(res));
    
    res = sort3(test3);
    console.assert(JSON.stringify(res3) === JSON.stringify(res));

}
main();