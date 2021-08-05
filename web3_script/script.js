const Web3 = require('web3');
const hex2ascii = require('hex2ascii');

const key = '8f7572d1-e253-420a-93bc-2ed8a6f051e6';
const url = 'https://sandbox.truffleteams.com/' + key;
const web3 = new Web3(url);

const contract = {    
    address: '0x34b41A8f1b89e94F9E50283DD9F3a296C620E2fA',
    abi: [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "bytes",
                    "name": "TimestampEST",
                    "type": "bytes"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "From",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "To",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "Continent",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "Value",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "bytes",
                    "name": "Memo",
                    "type": "bytes"
                },
                {
                    "indexed": false,
                    "internalType": "bytes",
                    "name": "TxnHash",
                    "type": "bytes"
                }
            ],
            "name": "trans",
            "type": "event"
        },
        {
            "stateMutability": "payable",
            "type": "fallback"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "bals",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "time",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "cont",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "memo",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "hash",
                    "type": "string"
                }
            ],
            "name": "give",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "time",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "cont",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "memo",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "hash",
                    "type": "string"
                }
            ],
            "name": "take",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
}
const myContract = new web3.eth.Contract(contract.abi, contract.address);

async function main() {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);

    const [ user, charity, store, ...others ] = accounts;
    // console.log(user, charity, store);

    const balance = await web3.eth.getBalance(accounts[0])
    console.log(balance);

    const promises = accounts.map(account => web3.eth.getBalance(account) );
    // console.log(promises);

    const balances = await Promise.all(promises);
    // console.log(balances);

    const hash = await web3.eth.sendTransaction({
        from: user,
        to: charity,
        value: 0
    })
    // console.log(hash);

    const asia = await myContract.methods.bals(0).call();
    console.log(asia);

    // const txn = await myContract.methods.give('', charity, 0, 0, '', '').send({ from: user });
    // console.log(txn);

    const events = await myContract.getPastEvents('trans', {
        fromBlock: 0,
        toBlock: 'latest',
    });
    console.log(events)
}

main();
