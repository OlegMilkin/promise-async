//Ассинхронность

console.log('start');

const p = new Promise(function(resolve, reject){
    setTimeout(() => {
        console.log('Preparing data...')
        const backendData = {
            server: 'aws',
            port: 2000,
            status: 'working'
        }
        resolve(backendData)
    }, 2000)
})

p.then(data => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            data.midified = true
            resolve(data)
        }, 2000)
    })
})
.then(clientData => {
    clientData.fromPromise = true
    return clientData
}).then(data => {
    console.log('Modified', data)
})
.catch(err => console.error('Error ', err))
.finally(() => console.log('Finally'))


//Sleep

const sleep = ms => {
    return new Promise(resolve => {
        setTimeout(()=> resolve(), ms)
    })
}


sleep(2000).then(()=> console.log('After 2 sec'));
sleep(3000).then(()=> console.log('After 3 sec'));

// Promise.all([sleep(2000), sleep(5000)]).then(()=> {
//     console.log('All promises')
// })

// Promise.race([sleep(2000), sleep(5000)]).then(()=> {
//     console.log('Race promises')
// })


//Async await работа с сервером fetch
const delay = ms => {
    return new Promise(r => setTimeout(() => r(), ms));
}

const url = 'https://jsonplaceholder.typicode.com/todos';

// function fetchTodos() {
//     console.log('Fetch todo started...')
//     return delay(2000)
//         .then(() => fetch(url))
//         .then(response => response.json())
// }

// fetchTodos()
//     .then(data => {
//         console.log('Data:', data)
//     })
//     .catch(e => console.error(e))

//или

async function fetchAsyncTodos() {
    console.log('Fetch todo started...')
    try {
        await delay(2000)
        fetch(url)
        const response = await fetch(url)
        const data = await response.json()
        console.log('Data:', data)
    } catch (e) {
        console.error(e)
    } finally {
        
    }
}

fetchAsyncTodos()