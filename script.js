// Promisified setTimeout, fetch, readFile

// All functions are called in main

const fs = require('fs');

function promisified_setTimeout(time) {
    let promise = new Promise((resolve) => {
        setTimeout(resolve, time);
    });

    return promise;
}

function promisified_fetch(endpoint) {
    let promise = fetch(endpoint);

    return promise;
}

function promisified_readFile(filename) {
    let promise = new Promise(
        function(resolve, reject) {
            fs.readFile(filename, "utf8", function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        }
    );

    return promise;
}


function setTimeoutParameter() {
    console.log("Thanks for waiting!\n");
}


function main() {
    // setTimeout
    promisified_setTimeout(5000).then(setTimeoutParameter);

    // fetch
    let data = promisified_fetch("https://reqres.in/api/users")
                    .then((response) => {
                        return response.json();
                    })
                    .then((info) => {
                        console.log(info);
                    });


    // fs.readFile()
    filename = "Promisified-Functions\\a.txt";

    promisified_readFile(filename)
        .then((text) => {
            console.log(text);
        })
        .catch((err) => {
            console.error(err);
        });
}

main();