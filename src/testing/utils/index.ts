import { ethers } from "ethers"
import { gameParametersAbi } from "shared/contracts/abi"

const TAHO_MULTISIG = "0xe8746F8728D152FCc9F6549C2baBAa79f5BF2E08"

const localhostProvider = new ethers.providers.JsonRpcProvider(
  process.env.LOCALHOST_RPC_URL
)

const impersonate = (address: string) =>
  localhostProvider.send("hardhat_impersonateAccount", [address])

const stopImpersonating = (address: string) =>
  localhostProvider.send("hardhat_stopImpersonatingAccount", [address])

const setBalance = (address: string, balance: string) =>
  localhostProvider.send("hardhat_setBalance", [address, balance])

// eslint-disable-next-line import/prefer-default-export
export async function unlockStaking() {
  await impersonate(TAHO_MULTISIG)
  await setBalance(TAHO_MULTISIG, "0x1000000000000")

  const contract = new ethers.Contract(
    CONTRACT_GameParameters,
    gameParametersAbi,
    localhostProvider
  )
  const signer = localhostProvider.getSigner(TAHO_MULTISIG)

  const tx = await contract.populateTransaction.updateStakeLockTime(
    ethers.BigNumber.from(20)
  )

  await signer.sendTransaction(tx)

  await stopImpersonating(TAHO_MULTISIG)
}