const Deed = artifacts.require('Deed')
const Hello = artifacts.require('Hello')

contract('Deed', async (accounts) => {
  let deed = null
  let hello = null
  const lawyer = accounts[1]
  const beneficiary = accounts[2]
  const balance = 100
  const executionTime = 3000 // ms

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  beforeEach(async () => {
    deed = await Deed.deployed()
    hello = await Hello.deployed()
  })

  it('Should have the lawyer, beneficiar, execution time, and amount set', async () => {
    const deedLawyer = await deed.lawyer()
    const deedBeneficiary = await deed.beneficiary()
    const deedBalance = await web3.eth.getBalance(deed.address)

    console.log('ACCOUNT ADDRESSES')
    console.log('Deed: ' + deed.address)
    console.log('Hello: ' + hello.address)
    console.log('accounts[0]: ' + accounts[0])
    console.log('Lawyer: ' + deedLawyer)
    console.log('Beneficiary: ' + deedBeneficiary)
    console.log('-----')
    for (let i = 0; i < accounts.length; i++) {
        console.log(i + ': ' + accounts[i])
    }
    console.log('-----')

    assert(lawyer == deedLawyer, 'incorrect lawyer account')
    assert(beneficiary == deedBeneficiary, 'incorrect beneficiary account')
    assert(balance === parseInt(deedBalance), 'incorrect deed balance')
  })

  it('Should withdraw smart contract balance', async () => {
    const beneficiaryBalanceBefore = web3.utils.toBN(
        await web3.eth.getBalance(beneficiary)
    )

    await sleep(executionTime + 1)
    await deed.withdraw({from: lawyer})

    const beneficiaryBalanceAfter = web3.utils.toBN(
        await web3.eth.getBalance(beneficiary)
    )
    const deedBalanceAfter = web3.utils.toBN(
        await web3.eth.getBalance(deed.address)
    )
    assert(deedBalanceAfter.toNumber() === 0)
    assert(beneficiaryBalanceAfter.sub(beneficiaryBalanceBefore).toNumber()
        === 100)
  })

  it('Should not withdraw balance when the lawyer executes the withdraw action to soon',
    async () => {
    const deed = await Deed.new(lawyer, beneficiary, executionTime, {value: balance})
    console.log('Deed.new: ' + deed.address)
    try {
       await deed.withdraw({from: lawyer})
    } catch (e) {
        assert(e.message.includes('Withdraw not available yet'))
        return
    }
    assert(false, 'Balance withdrawn to early!')
  })

  it('Should not send the blance if the executer is not the lawyer', async() => {
    const deed = await Deed.new(lawyer, beneficiary, executionTime, {value: balance})
    console.log('Deed.new: ' + deed.address)
    try {
        await sleep(executionTime + 1)
        await deed.withdraw({from: accounts[3]})
    } catch (e) {
        assert(e.message.includes('Only lawyer can withdraw'))
        return
    }
    assert(false, 'Balance withdrawn not by lawyer')
  })

})
