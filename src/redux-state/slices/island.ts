import { createSlice } from "@reduxjs/toolkit"
import {
  OverlayType,
  RealmContractData,
  RealmContractDataWithId,
} from "shared/types"

type IslandModeType = "default" | "join-realm"

export type IslandState = {
  mode: IslandModeType
  overlay: OverlayType
  realms: { [id: string]: RealmContractData }
  stakingRealmId: string | null
  displayedRealmId: string | null
}

const initialState: IslandState = {
  mode: "default",
  overlay: "none",
  realms: {},
  stakingRealmId: null,
  displayedRealmId: null,
}

const islandSlice = createSlice({
  name: "island",
  initialState,
  reducers: {
    setIslandMode: (
      immerState,
      { payload: mode }: { payload: IslandModeType }
    ) => {
      immerState.mode = mode
    },
    setIslandOverlay: (
      immerState,
      { payload: overlay }: { payload: OverlayType }
    ) => {
      immerState.overlay = overlay
    },
    setRealmContractData: (
      immerState,
      { payload: realmData }: { payload: RealmContractDataWithId[] }
    ) => {
      realmData.forEach(({ id, data }) => {
        immerState.realms[id] = data
      })
    },
    setStakingRealmId: (
      immerState,
      { payload: stakingRealmId }: { payload: string | null }
    ) => {
      immerState.stakingRealmId = stakingRealmId
    },
    setDisplayedRealmId: (
      immerState,
      { payload: displayedRealmId }: { payload: string | null }
    ) => {
      immerState.displayedRealmId = displayedRealmId
    },
    resetIsland: (immerState) => {
      immerState.mode = "default"
      immerState.overlay = "none"
    },
  },
})

export const {
  setIslandMode,
  setIslandOverlay,
  resetIsland,
  setRealmContractData,
  setDisplayedRealmId,
  setStakingRealmId,
} = islandSlice.actions

export default islandSlice.reducer
