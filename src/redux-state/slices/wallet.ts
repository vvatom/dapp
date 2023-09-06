import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import portrait from "shared/assets/portrait.png"
import { resolveAddressToName, truncateAddress } from "shared/utils"
import { ClaimState, resetClaiming, setClaimingUser } from "./claim"

export type WalletState = {
  isConnected: boolean
  address: string
  name: string
  avatar: string
}

const initialState: WalletState = {
  isConnected: false,
  address: "",
  name: "",
  avatar: portrait,
}

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    updateConnectedWallet: (
      immerState,
      {
        payload,
      }: { payload: { address: string; name?: string; avatar?: string } }
    ) => {
      immerState.isConnected = true
      immerState.address = payload.address || immerState.address
      immerState.name = payload.name || immerState.name || ""
      immerState.avatar = payload.avatar || immerState.avatar || portrait
    },
    updateDisconnectedWallet: (immerState) => {
      immerState.isConnected = false
      immerState.address = ""
      immerState.name = ""
      immerState.avatar = portrait
    },
  },
})

export const { updateConnectedWallet, updateDisconnectedWallet } =
  walletSlice.actions

export default walletSlice.reducer

export const selectWalletAddress = (state: { wallet: WalletState }) =>
  state.wallet.address

export const selectWalletTruncatedAddress = (state: { wallet: WalletState }) =>
  truncateAddress(state.wallet.address)

export const selectWalletName = (state: { wallet: WalletState }) =>
  state.wallet.name || truncateAddress(state.wallet.address)

export const selectWalletAvatar = (state: { wallet: WalletState }) =>
  state.wallet.avatar

export const selectIsWalletConnected = (state: { wallet: WalletState }) =>
  state.wallet.isConnected

export const fetchWalletName = createAsyncThunk(
  "wallet/fetchWalletName",
  async ({ address }: { address: string }, { dispatch, getState }) => {
    const {
      claim: { useConnectedWallet },
    } = getState() as { claim: ClaimState }

    const resolvedName = await resolveAddressToName(address)

    if (resolvedName) {
      dispatch(
        updateConnectedWallet({
          address,
          name: resolvedName,
        })
      )

      if (useConnectedWallet) {
        dispatch(setClaimingUser({ name: resolvedName, address }))
      }
    }
  }
)

export const connectWalletGlobally = createAsyncThunk(
  "wallet/connectWalletGlobally",
  async (
    { address, avatar }: { address: string; avatar?: string },
    { dispatch, getState }
  ) => {
    const {
      claim: { useConnectedWallet },
    } = getState() as { claim: ClaimState }

    dispatch(
      updateConnectedWallet({
        address,
        avatar,
      })
    )
    await dispatch(fetchWalletName({ address }))

    if (useConnectedWallet) {
      dispatch(setClaimingUser({ address }))
    }
  }
)

export const disconnectWalletGlobally = createAsyncThunk(
  "wallet/disconnectWalletGlobally",
  async (_, { dispatch, getState }) => {
    const {
      claim: { useConnectedWallet },
    } = getState() as { claim: ClaimState }

    dispatch(updateDisconnectedWallet())

    if (useConnectedWallet) {
      dispatch(resetClaiming())
    }
  }
)