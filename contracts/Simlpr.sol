	pragma solidity ^0.4.19;

	/**
	 * The Simplr contract allows a group of users to maintain credit and debit, make payments to vendors and settle debts in a trust-less environment
	 */
	contract Simplr {

		// Constructor 
		// Create a new contract 
		constructor (string gName , string userName) public {

			groupName = gName;
			addUser(userName, msg.sender);
			contractBalance = 0;

		}

		
		/* structure representing a user
			name : userName
			addr : wallet address
			balance : a positive or a negative balance
		 */

		struct User {
				// uint index;
				string name;
				address addr;
				uint balance;
			}
		
		struct Expense {
					string title;
					uint amount;
					address payTo;
					address[] payees;
					mapping (address => bool) agreements;
					string notes;
					
				}


		mapping (address => User) public users;

		address[] public addressList;

		Expense[] public expenses;

		uint public contractBalance;

		string public groupName;
		

		
		function addUser(string userName , address userAddress ) public {
				
			// Validate that there can be only one address per user
			require (userAddress != users[userAddress].addr);

			// initialize user with 0 balance
			User memory user = User({name: userName, addr: userAddress , balance: 0});
			//user.index = addressList.push(userAddress)-1;
			users[userAddress] = user;
			addressList.push(userAddress);
		}

		function fundContract() public payable {

			// Validate user is part of group
			require (msg.sender == users[msg.sender].addr);

			users[msg.sender].balance += msg.value;
			contractBalance+=msg.value;

		}

		// Withraw money from contract 
		function withdraw (uint amount) public onlyUser() payable{
			
			require (msg.sender == users[msg.sender].addr);
			require (amount > 0);
			require (amount <= users[msg.sender].balance);
			
			msg.sender.transfer(amount);

			users[msg.sender].balance -= amount;

			contractBalance-= amount;
		}

		

		function makePayment(string paymentTitle, uint paymentAmount , address paymentAddress , address[] paymentPayees , string paymentNotes) public onlyUser() payable {
			
			// Validate non-negative payment
			require (paymentAmount > 0);

			// Validate contract has enough balance
			require (contractBalance >= paymentAmount);
			
			// Validate sender is a part of the group
			require (msg.sender == users[msg.sender].addr);


			// Check for duplicate users
			require (!hasDuplicateUsers(paymentPayees));

			// Validate all payees are a part of the group
			require (validatePayees(paymentPayees));

			// Validate if all payees have enough balance
			require (validatePayeeBalance(paymentPayees,paymentAmount));
			


			Expense memory expense = Expense({title: paymentTitle, amount: paymentAmount, payTo: paymentAddress, payees: paymentPayees, notes: paymentNotes});
			expenses.push(expense);

			paymentAddress.transfer(paymentAmount);
			contractBalance -= paymentAmount;

			//Deduct balance of payees
			deductBalance(paymentPayees,paymentAmount);

		}
		
		function deductBalance (address[] payees,uint paymentAmount) internal {
			uint individualAmount = paymentAmount/payees.length;
			for(uint i=0;i<payees.length;i++){
				users[payees[i]].balance -= individualAmount;
			}
		} 
		
		function validatePayeeBalance (address[] payees,uint paymentAmount) internal view returns (bool) {
			uint individualAmount = paymentAmount/payees.length;
			for(uint i=0;i<payees.length;i++){
				if(users[payees[i]].balance < individualAmount){
					return false;
				}
			}
			return true;
		}
		
		function isUserInGroup () view public returns(bool){
			return (users[msg.sender].addr == msg.sender);
			
		}
		
		
		//  Checks if all payees are a part of the group
		function validatePayees (address[] payees) internal view returns (bool) {
			for(uint i=0;i<payees.length;i++){
				if(payees[i] != users[payees[i]].addr){
					return false;
				}
			}
			return true;
		}
		
		function hasDuplicateUsers (address[] payees) internal pure returns(bool) {
			for(uint i=0;i<payees.length;i++){
				for(uint j=i+1;j<payees.length;j++){
					if(payees[i] == payees[j]) {
						return true;
					}
				}
			}
			return false;

		}

		function getNumberOfUsers() public view returns(uint){
			return addressList.length;		
		}
		
		function getUserBalance () public onlyUser() view returns(uint)  {
			return users[msg.sender].balance;
		}

		function getContractBalance () public onlyUser() view returns(uint) {
			return address(this).balance;
		}

		modifier onlyUser() { 
			require (msg.sender == users[msg.sender].addr); 
			_; 
		}
						
	}

				