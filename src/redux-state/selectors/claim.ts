import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "redux-state/reducers"
import { truncateAddress } from "shared/utils"
import { RealmContractData } from "shared/types"
import { selectRealmById } from "./island"

export const selectClaimingUser = (state: RootState) => ({
  name: state.claim.name || truncateAddress(state.claim.address),
  address: state.claim.address,
})

export const selectHasClaimed = (state: RootState) => state.claim.hasClaimed

export const selectEligibility = (state: RootState) => state.claim.eligibility

export const selectUseConnectedWalletToClaim = (state: RootState) =>
  state.claim.useConnectedWallet

export const selectStakingData = createSelector(
  (state: RootState) =>
    state.claim.selectedRealmId
      ? selectRealmById(state, state.claim.selectedRealmId)
      : null,
  (state: RootState) => state.claim.stakeAmount,
  (realmData: RealmContractData | null, stakeAmount) => ({
    realmContractAddress: realmData ? realmData.realmContractAddress : null,
    stakeAmount,
  })
)

export const selectRepresentativeAddress = (state: RootState) =>
  state.claim.representativeAddress

export const selectRealmId = (state: RootState) => state.claim.selectedRealmId
