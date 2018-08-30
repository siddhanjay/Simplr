pragma solidity ^0.4.19;

/**
 * The Simplr contract allows a group of users to maintain credit and debit and settle them in a trust-less environment
 */
contract Simplr {

	// Constructor 
	constructor (string name) public {
		addUser(name, msg.sender);
	}

	
	/* structure representing a user
		name : userName
		addr : wallet address
		balance : a positive or a negative balance
	 */

	struct User {
			uint index;
			string name;
			address addr;
			int balance;
		}
	
	struct Expense {
				string title;
				uint amount;
				address payer;
				address[] payees;
				mapping (address => bool) agreements;
				string notes;
				
			}
	struct Payment {
				string title;
				address payer;
				address payee;
				uint amount;
				
			}

	mapping (address => User) public users;

	address[] public addressList;

	Expense[] public expenses;

	Payment[] public payments;

	mapping (address => uint) public withdrawls;
	

	
	function addUser(string userName , address userAddress ) public {
			
		// Validate that there can be only one address per user
		require (userAddress != users[userAddress].addr);

		// initialize user with 0 balance
		User memory user = User({name: userName, addr: userAddress , balance: 0, index:0});
		user.index = addressList.push(userAddress)-1;
		users[userAddress] = user;
	}


	function addExpense(string expenseTitle, uint expenseAmount, address[] expensePayees , string expenseNotes) public {
		
		// Validate non-negative expenseAmount
		require (expenseAmount > 0);

		// Validate expensePayer is a part of the group
		require (msg.sender == users[msg.sender].addr);

		// Validate all participants are a part of the group
		require (validatePayees(expensePayees));
		
		// Check for duplicate users
		require (!hasDuplicateUsers(expensePayees));

		Expense memory expense = Expense({title: expenseTitle, amount: expenseAmount, payer: msg.sender, payees: expensePayees, notes: expenseNotes});
		expenses.push(expense);
		updateBalances(msg.sender,expensePayees,expenseAmount);
	}

	function makePayment(string paymentTitle, address paymentPayee) public onlyUser() payable {
		
		// Validate non-negative payment
		require (msg.value > 0);

		require (paymentPayee != msg.sender);
		
		// Validate sender is a part of the group
		require (msg.sender == users[msg.sender].addr);

		// Validate payee is a part of the group
		require (paymentPayee == users[paymentPayee].addr);

		Payment memory payment = Payment({title: paymentTitle, payer: msg.sender, payee: paymentPayee, amount:msg.value});
		payments.push(payment);
		withdrawls[paymentPayee] += msg.value;
		
		syncPayment(payment);
	}
	
	// TODO : withdraw any amount
	function withdraw () public onlyUser() payable{
		
		require (msg.sender == users[msg.sender].addr);
		uint transferAmount = withdrawls[msg.sender];
		require (transferAmount > 0);
		msg.sender.transfer(transferAmount);
		withdrawls[msg.sender] = 0;
		
	}
	

	function isUserInGroup () view public returns(bool){
		return (users[msg.sender].addr == msg.sender);
		
	}
	
	
	function syncPayment (Payment payment) internal {
		users[payment.payee].balance -= int(payment.amount);
		users[payment.payer].balance += int(payment.amount);
	}
	

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

	function updateBalances(address payer , address[] payees, uint amount) internal {
		
		uint payeeLength = payees.length;
		require (payeeLength > 0);

		// increment payer balance
		users[payer].balance += int(amount);

		int owedPayment = int(amount/payeeLength);

		for(uint i=0;i<payeeLength;i++){
			users[payees[i]].balance -= owedPayment;
		}
		
	}

	function getNumberOfUsers() public view returns(uint){
		return addressList.length;		
	}
	
	

	modifier onlyUser() { 
		require (msg.sender == users[msg.sender].addr); 
		_; 
	}
	

					
}

			