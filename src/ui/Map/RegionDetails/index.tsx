import React from "react"
import TabPanel from "shared/components/TabPanel"
import Leaderboard from "./Leaderboard"
import Staking from "./Staking"
import BannerConnect from "./BannerConnect"

export default function RegionDetails() {
  return (
    <>
      <BannerConnect />
      <TabPanel
        tabs={[
          {
            label: "Rewards",
            component: null, // TODO: <Rewards />
          },
          { label: "Stake", component: <Staking /> },
          { label: "Leaderboard", component: <Leaderboard /> },
          {
            label: "Council",
            component: null,
            // TODO: <Council />
          },
        ]}
      />
    </>
  )
}