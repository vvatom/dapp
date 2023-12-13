import React from "react"

import OnboardingView from "ui/Onboarding/OnboardingView"
import {
  useBalanceFetch,
  useCorrectChain,
  useGameDataFetch,
  useGameLoadDataFetch,
  useOnboardingView,
  usePopulationFetch,
  useWallet,
  useWalletChange,
} from "shared/hooks"
import IslandView from "../Island/IslandView"

export default function DAppDesktop() {
  useWallet()
  useGameLoadDataFetch()
  useBalanceFetch()
  usePopulationFetch()
  useGameDataFetch()
  useWalletChange()
  useCorrectChain()

  const { shouldShowOnboardingView } = useOnboardingView()

  return shouldShowOnboardingView ? <OnboardingView /> : <IslandView />
}
