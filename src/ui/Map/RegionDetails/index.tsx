import React from "react"
import TabPanel from "shared/components/TabPanel"
import Leaderboard from "./Leaderboard"
import Staking from "./Staking"
import BannerConnect from "ui/Map/RegionDetails/RegionBanners/BannerConnect"
import BannerJoin from "ui/Map/RegionDetails/RegionBanners/BannerJoin"
import BannerClaim from "ui/Map/RegionDetails/RegionBanners/BannerClaim"

// Test data to display valid banner
const VOTING: boolean = false
const STAKED: string | boolean = true
const HAS_FUNDS: boolean = false

type RegionDetailsProps = {
  regionId: string
  onClose: () => void
}

export default function RegionDetails({
  regionId,
  onClose,
}: RegionDetailsProps) {
  return (
    <>
      <BannerConnect />
      {!STAKED && <BannerJoin isDisabled={!VOTING} />}
      {!HAS_FUNDS && STAKED === "disabled" && <BannerClaim onClose={onClose} />}
      <TabPanel
        tabs={[
          {
            label: "Rewards",
            component: null, // TODO: <Rewards />
          },
          {
            label: "Stake",
            component: <Staking regionId={regionId} onClose={onClose} />,
          },
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
