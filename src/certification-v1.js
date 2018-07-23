import web3 from './web3';

const address = '0x0e9e15f51a605016d9ab7e74090269587e8ef4d0'; // on Ropsten

const abi = [
	{
		"constant": true,
		"inputs": [],
		"name": "getStudentRequestsLength",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "studentRequests",
		"outputs": [
			{
				"name": "studentAddress",
				"type": "address"
			},
			{
				"name": "studentName",
				"type": "string"
			},
			{
				"name": "studentEmail",
				"type": "string"
			},
			{
				"name": "studentPhone",
				"type": "string"
			},
			{
				"name": "courseId",
				"type": "uint256"
			},
			{
				"name": "complete",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getCoursesLength",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_studentAddress",
				"type": "address"
			},
			{
				"name": "_courseId",
				"type": "uint256"
			}
		],
		"name": "verifyCertification",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "educator",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_requestId",
				"type": "uint256"
			}
		],
		"name": "approveCertification",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "courses",
		"outputs": [
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "startDate",
				"type": "uint256"
			},
			{
				"name": "endDate",
				"type": "uint256"
			},
			{
				"name": "description",
				"type": "string"
			},
			{
				"name": "instructor",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_requestId",
				"type": "uint256"
			}
		],
		"name": "rejectCertification",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "clearAllRequests",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_studentName",
				"type": "string"
			},
			{
				"name": "_studentEmail",
				"type": "string"
			},
			{
				"name": "_studentPhone",
				"type": "string"
			},
			{
				"name": "_courseId",
				"type": "uint256"
			}
		],
		"name": "applyForCertification",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_name",
				"type": "string"
			},
			{
				"name": "_startDate",
				"type": "uint256"
			},
			{
				"name": "_endDate",
				"type": "uint256"
			},
			{
				"name": "_description",
				"type": "string"
			},
			{
				"name": "_instructor",
				"type": "string"
			}
		],
		"name": "addCourse",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "student2course",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
];

export default new web3.eth.Contract(abi, address);