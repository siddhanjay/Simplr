# Simplr
Expense sharing via smart contracts

Simplr is a decentralized Web 3.0 application to simplify splitting bills with friends and family on the blockchain. It is a great way for splitting dinner tabs , sharing expenses with friends on trips or coordinating household purchases with roommates.
Simplr keeps track of your contribution in shared expenses , allows you to make combined payments to vendors and ultimately calculates and refunds you back the leftover amount.Users start out by funding the smart contract with Qtum tokens, adding friends to the group,making purchases using the contract and at the end, withdrawing the leftover money owed to them.

How to run :

Run Local Blockchain in regtest mode
docker run -it --rm \
  --name myapp \
  -v `pwd`:/dapp \
  -p 9899:9899 \
  -p 9888:9888 \
  -p 3889:3889 \
  hayeah/qtumportal

Shell Access Into The Container
docker exec -it myapp sh

Generate some initial balance
qcli generate 600

Create owner address
qcli getnewaddress

Configure the deployment tool solar to use this address
export QTUM_SENDER=<owner_address>

Deploy the Simplr contract
solar deploy Simplr/contracts/Simplr.sol

For Web Server of DApp,
sudo npm install
sudo npm start

Then in another terminal window , run
sudo npm run start-ui 

In the browser , visit localhost:3002 for the UI

For authorization UI, http://localhost:9899/ .Approve/Reject the transaction record.