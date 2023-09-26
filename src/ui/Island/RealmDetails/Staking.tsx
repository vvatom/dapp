import React, { useState } from "react"
import TokenAmountInput from "shared/components/TokenAmountInput"
import Button from "shared/components/Button"
import TransactionsModal from "shared/components/Transactions/TransactionsModal"
import { TransactionProgressStatus } from "shared/types"
import {
  stakeTaho,
  useDappDispatch,
  useDappSelector,
  selectDisplayedRealmAddress,
  selectTokenBalanceByAddress,
  selectStakingRealmAddress,
  selectIsStakingRealmDisplayed,
  selectDisplayedRealmVeTokenAddress,
  unstakeTaho,
  selectDisplayedRealmId,
} from "redux-state"
import { isValidInputAmount, userAmountToBigInt } from "shared/utils"
import classNames from "classnames"
import { TAHO_ADDRESS } from "shared/constants"
import UnstakeCooldown from "shared/components/Staking/UnstakeCooldown"
import ModalLeavingNode from "../Modals/ModalLeavingNode"
import BannerEarn from "./RealmBanners/BannerEarn"
import BannerTakeToNode from "./RealmBanners/BannerTakeToNode"

function isFormDisabled(
  balance: bigint,
  hasStakingRealm: boolean,
  isStakingRealm: boolean
) {
  return balance === 0n || (hasStakingRealm && !isStakingRealm)
}

type StakingProps = {
  close: () => void
}

export default function Staking({ close }: StakingProps) {
  const dispatch = useDappDispatch()

  const displayedRealmAddress = useDappSelector(selectDisplayedRealmAddress)
  const displayedRealmVeTokenAddress = useDappSelector(
    selectDisplayedRealmVeTokenAddress
  )
  const stakingRealmContractAddress = useDappSelector(selectStakingRealmAddress)
  const displayedRealmId = useDappSelector(selectDisplayedRealmId)
  const isStakingRealm = useDappSelector(selectIsStakingRealmDisplayed)
  const hasStakingRealm = !!stakingRealmContractAddress

  const tahoBalance = useDappSelector((state) =>
    selectTokenBalanceByAddress(state, TAHO_ADDRESS)
  )
  const veTahoBalance = useDappSelector((state) =>
    selectTokenBalanceByAddress(state, displayedRealmVeTokenAddress)
  )
  const [stakeAmount, setStakeAmount] = useState("")
  const [isStakeAmountValid, setIsStakeAmountValid] = useState(false)

  const [unstakeAmount, setUnstakeAmount] = useState("")
  const [isUnstakeAmountValid, setIsUnstakeAmountValid] = useState(false)

  const [isLeavingModalVisible, setIsLeavingModalVisible] = useState(false)

  const [isStakeTransactionModalOpen, setIsStakeTransactionModalOpen] =
    useState(false)
  const [isUnstakeTransactionModalOpen, setIsUnstakeTransactionModalOpen] =
    useState(false)

  const disabledStake = isFormDisabled(
    tahoBalance,
    hasStakingRealm,
    isStakingRealm
  )
  const disabledUnstake = isFormDisabled(
    veTahoBalance,
    hasStakingRealm,
    isStakingRealm
  )

  const stakeTransaction = () => {
    const amount = userAmountToBigInt(stakeAmount)
    if (displayedRealmAddress && amount) {
      dispatch(
        stakeTaho({
          realmContractAddress: displayedRealmAddress,
          amount,
        })
      )
    }
  }

  const unstakeTransaction = () => {
    const amount = userAmountToBigInt(unstakeAmount)
    if (displayedRealmAddress && displayedRealmVeTokenAddress && amount) {
      dispatch(
        unstakeTaho({
          realmContractAddress: displayedRealmAddress,
          veTokenContractAddress: displayedRealmVeTokenAddress,
          amount,
        })
      )
    }
  }

  const shouldLinkToNode = hasStakingRealm && !isStakingRealm
  const shouldLinkToReferrals = !shouldLinkToNode && tahoBalance === 0n

  const isCooldownPeriod = false

  return (
    <>
      {shouldLinkToNode && <BannerTakeToNode />}
      {shouldLinkToReferrals && <BannerEarn close={close} />}

      <div className="staking">
        <div
          className={classNames("stake_control", {
            disabled: disabledStake,
          })}
        >
          <div className="stake_control_header">
            <h3 style={{ color: "var(--trading-in)" }}>Stake</h3>
            <TokenAmountInput
              label="Wallet balance:"
              inputLabel="Stake amount"
              disabled={disabledStake}
              amount={stakeAmount}
              tokenAddress={CONTRACT_Taho}
              onChange={setStakeAmount}
              onValidate={(isValid) => setIsStakeAmountValid(isValid)}
            />
          </div>
          <Button
            type="primary"
            size="medium"
            isDisabled={
              disabledStake ||
              !isStakeAmountValid ||
              !isValidInputAmount(stakeAmount)
            }
            onClick={() => setIsStakeTransactionModalOpen(true)}
          >
            Stake $TAHO
          </Button>
        </div>
        {!isCooldownPeriod ? (
          <div
            className={classNames("stake_control", {
              disabled: disabledUnstake,
            })}
          >
            <div className="stake_control_header">
              <h3 style={{ color: "var(--trading-out)" }}>Unstake</h3>
              <TokenAmountInput
                label="Staked amount:"
                inputLabel="Unstake amount"
                disabled={disabledUnstake}
                amount={unstakeAmount}
                tokenAddress={displayedRealmVeTokenAddress ?? ""}
                onChange={setUnstakeAmount}
                onValidate={(isValid) => setIsUnstakeAmountValid(isValid)}
              />
            </div>
            <Button
              type="primary"
              size="medium"
              isDisabled={
                disabledUnstake ||
                !isUnstakeAmountValid ||
                !isValidInputAmount(unstakeAmount)
              }
              onClick={() => setIsUnstakeTransactionModalOpen(true)}
            >
              Unstake $TAHO
            </Button>
          </div>
        ) : (
          <UnstakeCooldown stakedAt={Date.now()} /> // TODO: change stakedAt to real value
        )}
      </div>
      {isLeavingModalVisible && displayedRealmId && (
        <ModalLeavingNode
          realmId={displayedRealmId}
          close={() => setIsLeavingModalVisible(false)}
        />
      )}
      <TransactionsModal
        isOpen={isStakeTransactionModalOpen}
        close={() => setIsStakeTransactionModalOpen(false)}
        transactions={[
          {
            id: "stake",
            title: "Approve and stake $TAHO",
            buttonLabel: "Approve & stake",
            status: TransactionProgressStatus.Idle, // TODO: status is not yet implemented
            sendTransaction: stakeTransaction,
          },
        ]}
      />
      <TransactionsModal
        isOpen={isUnstakeTransactionModalOpen}
        close={() => setIsUnstakeTransactionModalOpen(false)}
        transactions={[
          {
            id: "stake",
            title: "Approve and unstake $TAHO",
            buttonLabel: "Approve & unstake",
            status: TransactionProgressStatus.Idle, // TODO: status is not yet implemented
            sendTransaction: unstakeTransaction,
          },
        ]}
      />
      <style jsx>{`
        .staking {
          display: flex;
          gap: 32px;
          padding: 24px 0;
        }
        .stake_control {
          display: flex;
          min-height: 280px;
          padding: 16px 24px 24px 24px;
          flex-direction: column;
          gap: 14px;
          border-radius: 8px;
          background: var(--primary-p1-40);
        }
        .disabled {
          opacity: 0.5;
        }
      `}</style>
    </>
  )
}