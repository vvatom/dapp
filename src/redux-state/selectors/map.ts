import { RootState } from "redux-state/reducers"

export const selectMapMode = (state: RootState) => state.map.mode

export const selectMapOverlay = (state: RootState) => state.map.overlay

export const selectRegions = (state: RootState) => state.map.regions
