const playballAbi = [
  {
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "inputs": [],
    "name": "BASE_BET",
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
    "inputs": [],
    "name": "BET_DIFF",
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
    "inputs": [],
    "name": "Dealer_Price",
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
    "inputs": [],
    "name": "MAX_MULTIPLE",
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
    "inputs": [],
    "name": "become_dealer",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_addr",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_index",
        "type": "uint256"
      }
    ],
    "name": "get_ball_num",
    "outputs": [
      {
        "internalType": "uint32[6]",
        "name": "",
        "type": "uint32[6]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "get_indexball",
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
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_airdrop",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_grant_address",
        "type": "address"
      }
    ],
    "name": "initialize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "myHashBall",
    "outputs": [
      {
        "internalType": "contract MyHashBall",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "mycommittee",
    "outputs": [
      {
        "internalType": "contract MyCommittee",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "mycommunity",
    "outputs": [
      {
        "internalType": "contract MyCommunity",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "mydrawwinner",
    "outputs": [
      {
        "internalType": "contract MyDrawWinner",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "myevent",
    "outputs": [
      {
        "internalType": "contract MyEvent",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_hashball",
        "type": "bytes32"
      },
      {
        "internalType": "uint72",
        "name": "_mutiple",
        "type": "uint72"
      }
    ],
    "name": "play_ball",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_hashball",
        "type": "bytes32"
      },
      {
        "internalType": "uint72",
        "name": "_mutiple",
        "type": "uint72"
      },
      {
        "internalType": "address",
        "name": "dealer",
        "type": "address"
      }
    ],
    "name": "play_ball_dealer",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint32[6]",
        "name": "nums",
        "type": "uint32[6]"
      },
      {
        "internalType": "uint72",
        "name": "_mutiple",
        "type": "uint72"
      },
      {
        "internalType": "address",
        "name": "dealer",
        "type": "address"
      }
    ],
    "name": "play_ball_dealer_normal",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint32[6]",
        "name": "nums",
        "type": "uint32[6]"
      },
      {
        "internalType": "uint72",
        "name": "_mutiple",
        "type": "uint72"
      }
    ],
    "name": "play_ball_normal",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32[]",
        "name": "_hashballs",
        "type": "bytes32[]"
      },
      {
        "internalType": "address[]",
        "name": "addrs",
        "type": "address[]"
      }
    ],
    "name": "play_ball_organization",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_hashball",
        "type": "bytes32"
      },
      {
        "internalType": "uint72",
        "name": "_mutiple",
        "type": "uint72"
      },
      {
        "internalType": "uint256",
        "name": "_epoch",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_addr",
        "type": "address"
      }
    ],
    "name": "set_ball_hash_for_test",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint32[6]",
        "name": "nums",
        "type": "uint32[6]"
      },
      {
        "internalType": "uint72",
        "name": "_mutiple",
        "type": "uint72"
      },
      {
        "internalType": "uint256",
        "name": "_epoch",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_addr",
        "type": "address"
      }
    ],
    "name": "set_ball_normal_for_test",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_developer",
        "type": "address"
      }
    ],
    "name": "set_developer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_myhashball",
        "type": "address"
      }
    ],
    "name": "set_hashball",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_mycommittee",
        "type": "address"
      }
    ],
    "name": "set_mycommittee",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_mycommunity",
        "type": "address"
      }
    ],
    "name": "set_mycommunity",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_mydrawwinner",
        "type": "address"
      }
    ],
    "name": "set_mydrawwinner",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_myevent",
        "type": "address"
      }
    ],
    "name": "set_myevent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_stake_pool",
        "type": "address"
      }
    ],
    "name": "set_stake_pool",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
]

export default playballAbi