import React, { useMemo } from "react"
import useImage from "use-image"

import backgroundImg from "public/dapp_map_bg.webp"
import { regions } from "shared/constants"
import { createCutoutFromPath } from "shared/utils"
import Region from "./Region"

export default function MapRegions() {
  const [bg] = useImage(backgroundImg)
  const regionImgLayers = useMemo(() => {
    if (!bg) {
      return []
    }

    return regions.map((region) => ({
      region,
      layer: createCutoutFromPath(region, bg),
    }))
  }, [bg])

  return (
    <>
      {regionImgLayers.map(({ region, layer: crop }) => (
        <Region
          key={region.id}
          id={region.id}
          imageLayer={crop}
          color={region.color}
          name={region.name}
          width={region.w}
          height={region.h}
          x={region.x}
          y={region.y}
          labelX={region.labelX}
          labelY={region.labelY}
          path={region.paths[0].data}
        />
      ))}
    </>
  )
}