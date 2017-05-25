var asyncAdd = (a,b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof a === "number" && typeof b === "number") {
                resolve (a + b);
            } else {
                reject('Arguments must be numbers');
            }
        }, 1950);
    })
};

asyncAdd(6,33).then((res) => {
    console.log('Result ', res)
    return asyncAdd(res, '6');
}, (errorMessage) => {
    console.log(errorMessage);
}).then ((res)=> {
    console.log('Should be: ', res)
}).catch((errorMessage)=> {
    console.log(errorMessage);
})

// var somePromise = new Promise ((resolve, reject) => {
//     setTimeout(() => {
//         resolve('Hey. My guy');
//         reject('Negative batman');
//     }, 2657)
// });

// somePromise.then((message) => {
//     console.log('Success', message);
// }, (errorMessage) => {
//     console.log('Error:', errorMessage);
// });