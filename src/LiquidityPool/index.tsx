import React, { useState } from "react"
import { encodeUserData } from "shared/utils/pool"
import {
  selectIsWalletConnected,
  selectWalletAddress,
  useSelector,
} from "redux-state"
import TokenAmountInput from "shared/components/TokenAmountInput"
import {
  ETH_ADDRESS,
  bigIntToUserAmount,
  isValidInputAmount,
  userAmountToBigInt,
} from "../shared/utils"
import { LiquidityPoolRequest } from "../shared/types"
import {
  getAllowance,
  setAllowance,
  getBalancerPoolAddress,
  getBalancerPoolAgentAddress,
  joinPool,
  totalSupply,
} from "../shared/contracts"
import { useArbitrumProvider, useSendTransaction } from "../shared/hooks"
import Button from "../shared/components/Button"
import Modal from "../shared/components/Modal"

export default function LiquidityPool() {
  const address = useSelector(selectWalletAddress)

  const provider = useArbitrumProvider()
  const { send: sendJoinPool, isReady: isJoinPoolReady } =
    useSendTransaction(joinPool)
  const { send: sendSetAllowance, isReady: isSetAllowanceReady } =
    useSendTransaction(setAllowance)
  const isConnected = useSelector(selectIsWalletConnected)

  const [tahoAmount, setTahoAmount] = useState("")
  const [ethAmount, setEthAmount] = useState("")

  const signJoinPool = async (
    joinRequest: LiquidityPoolRequest,
    overrides?: { value: bigint }
  ) => {
    if (isJoinPoolReady && address) {
      const receipt = await sendJoinPool({ joinRequest, overrides })

      if (receipt) {
        // TODO remove when designs be ready
        // eslint-disable-next-line no-console
        console.log(receipt)
        setTahoAmount("")
        setEthAmount("")
      }
    }
  }

  const joinTahoPool = async () => {
    try {
      if (!provider || !address || !isSetAllowanceReady) {
        throw new Error("No provider or address")
      }
      const targetTahoAmount = userAmountToBigInt(tahoAmount)
      const targetEthAmount = userAmountToBigInt(ethAmount)

      if (targetTahoAmount && targetEthAmount) {
        const balancerPoolAgentAddress = await getBalancerPoolAgentAddress(
          provider
        )
        const allowanceValue = await getAllowance(provider, CONTRACT_Taho, {
          account: address,
          address: balancerPoolAgentAddress,
        })
        if (allowanceValue < targetTahoAmount) {
          await sendSetAllowance(
            { address: balancerPoolAgentAddress, amount: targetTahoAmount },
            CONTRACT_Taho
          )
        }
        const maxAmountsIn = [targetTahoAmount, targetEthAmount]
        const poolAddress = await getBalancerPoolAddress(provider)
        const lpTokenSupply = await totalSupply(provider, poolAddress)
        const userData = await encodeUserData(lpTokenSupply, maxAmountsIn)
        await signJoinPool(
          {
            assets: [CONTRACT_Taho, ETH_ADDRESS],
            maxAmountsIn,
            userData,
            fromInternalBalance: false,
          },
          {
            value: targetEthAmount,
          }
        )
      }
    } catch (err) {
      // TODO Add error handing
      // eslint-disable-next-line no-console
      console.error(err)
    }
  }

  return (
    <Modal.Container type="map-without-overlay">
      <Modal.Content>
        <div className="content column_center">
          <div className="lp_container row">
            <div className="token column">
              <span>TAHO</span>
              <TokenAmountInput
                label="Wallet balance:"
                inputLabel="Amount"
                amount={tahoAmount}
                tokenAddress={CONTRACT_Taho}
                onChange={setTahoAmount}
              />
            </div>
            <div className="token column">
              <span>ETH</span>
              <TokenAmountInput
                label="Wallet balance:"
                inputLabel="Amount"
                amount={ethAmount}
                tokenAddress={ETH_ADDRESS}
                onChange={setEthAmount}
              />
            </div>
          </div>
          <Button
            type="primary"
            size="medium"
            onClick={joinTahoPool}
            isDisabled={
              isValidInputAmount(tahoAmount) ||
              isValidInputAmount(ethAmount) ||
              !isConnected
            }
          >
            Join Pool
          </Button>
        </div>
        <style jsx>{`
          .content {
            width: 812px;
            margin: 20px;
            height: 250px;
          }
          .lp_container {
            gap: 16px;
          }
          .token {
            gap: 8px;
            align-items: center;
          }
        `}</style>
      </Modal.Content>
    </Modal.Container>
  )
}
