const Deed = artifacts.require('Deed')

contract('Deed', async (accounts) => {
  let deed = null
  const lawyer = accounts[1]
  const beneficiary = accounts[2]
  const balance = 100

  before(async () => {
    deed = await Deed.deployed()
  })

  it('Should have the lawyer, beneficiar, execution time, and amount set', async () => {
    const deedLawyer = await deed.lawyer()
    const deedBeneficiary = await deed.beneficiary()
    const deedBalance = await web3.eth.getBalance(deed.address)

    assert(lawyer == deedLawyer, 'incorrect lawyer account')
    assert(beneficiary == deedBeneficiary, 'incorrect beneficiary account')
    assert(balance === parseInt(deedBalance), 'incorrect deed balance')
  })

  it(`Should send the smart contract balance when the laywer executes the withdraw
      action after execution time has passed`,
      async () => {
  })

  it('Should not send the balance when the lawyer executes the withdraw action to soon',
    async () => {
  })

  it('Should not send the blance if the executer is not the lawyer', async() => {
  })

})
