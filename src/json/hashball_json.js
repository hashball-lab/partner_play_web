const hashballAbi = [
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
    "inputs": [
      {
        "internalType": "uint32[6]",
        "name": "nums",
        "type": "uint32[6]"
      },
      {
        "internalType": "uint256",
        "name": "_salt",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_index_ball",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_epoch",
        "type": "uint256"
      }
    ],
    "name": "check_ball",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      },
      {
        "internalType": "uint32[]",
        "name": "",
        "type": "uint32[]"
      },
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_index_ball",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_epoch",
        "type": "uint256"
      }
    ],
    "name": "check_ball_normal",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      },
      {
        "internalType": "uint32[]",
        "name": "",
        "type": "uint32[]"
      },
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_index_ball",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_epoch",
        "type": "uint256"
      }
    ],
    "name": "claim_prize1_2_3",
    "outputs": [],
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
        "internalType": "uint256",
        "name": "_salt",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_index_ball",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_epoch",
        "type": "uint256"
      }
    ],
    "name": "claim_prize4_5_6",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_index_ball",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_epoch",
        "type": "uint256"
      }
    ],
    "name": "claim_prize4_5_6_normal",
    "outputs": [],
    "stateMutability": "nonpayable",
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
        "name": "_owner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_epoch",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "index_ball",
        "type": "uint256"
      }
    ],
    "name": "deal_play_ball_external",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_epoch",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_total_value",
        "type": "uint256"
      }
    ],
    "name": "form_epoch_prize_value",
    "outputs": [],
    "stateMutability": "nonpayable",
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
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "get_pool_money_back",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_epoch",
        "type": "uint256"
      }
    ],
    "name": "get_prize_member_reward",
    "outputs": [
      {
        "internalType": "uint256[6]",
        "name": "",
        "type": "uint256[6]"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "uint256[6]",
        "name": "",
        "type": "uint256[6]"
      },
      {
        "internalType": "uint256[6]",
        "name": "",
        "type": "uint256[6]"
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
      }
    ],
    "name": "initialize",
    "outputs": [],
    "stateMutability": "nonpayable",
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
    "name": "mycompare",
    "outputs": [
      {
        "internalType": "contract MyCompare",
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
    "inputs": [],
    "name": "myplayball",
    "outputs": [
      {
        "internalType": "contract MyPlayBall",
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
        "internalType": "uint32[6]",
        "name": "nums",
        "type": "uint32[6]"
      },
      {
        "internalType": "uint256",
        "name": "_salt",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_index_ball",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_epoch",
        "type": "uint256"
      }
    ],
    "name": "save_prize_status",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_myaddress",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "_true_false",
        "type": "bool"
      }
    ],
    "name": "set_authorize_ball_play",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_myaddress",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "_true_false",
        "type": "bool"
      }
    ],
    "name": "set_authorize_drawwinner",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_myaddress",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "_true_false",
        "type": "bool"
      }
    ],
    "name": "set_authorize_pool",
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
      },
      {
        "internalType": "address",
        "name": "_mycompare",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_mydrawwinner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_myplayball",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_myevent",
        "type": "address"
      }
    ],
    "name": "set_contracts",
    "outputs": [],
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
        "internalType": "uint256",
        "name": "_salt",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_index_ball",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_epoch",
        "type": "uint256"
      }
    ],
    "name": "submit_claim_request",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_index_ball",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_epoch",
        "type": "uint256"
      }
    ],
    "name": "submit_claim_request_normal",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }

]

  export default hashballAbi