import { easings, useSpring } from "@react-spring/web"
import { useMemo } from "react"
import { selectRealmPanelVisible, useDappSelector } from "redux-state"
import { REALM_PANEL_ANIMATION_TIME } from "shared/constants"

export function useRealmPanelTransition(position: "left" | "right") {
  const realmPanelVisible = useDappSelector(selectRealmPanelVisible)

  const panelStyles = useMemo(
    () => ({
      base: {
        overflow: "visible auto",
        position: "absolute",
        top: 0,
        padding: "180px 0",
        height: "100vh",
        maxWidth: 480,
      },
      hidden: position === "left" ? { left: -480 } : { right: -480 },
      open: position === "left" ? { left: 0 } : { right: 0 },
    }),
    [position]
  )

  const [panelTransition] = useSpring(() => {
    const destinationStyle = realmPanelVisible
      ? panelStyles.open
      : panelStyles.hidden

    return {
      from: { ...panelStyles.base, ...panelStyles.hidden },
      to: { ...panelStyles.base, ...destinationStyle },
      config: {
        duration: REALM_PANEL_ANIMATION_TIME,
        easing: easings.easeOutCubic,
      },
    }
  }, [realmPanelVisible])

  return panelTransition
}

export function useRealmCloseButtonTransition() {
  const realmPanelVisible = useDappSelector(selectRealmPanelVisible)

  const buttonStyles = useMemo(
    () => ({
      base: { left: "50%", transform: "translateX(-50%)" },
      visible: { bottom: 160 },
      hidden: { bottom: -50 },
    }),
    []
  )

  const [buttonTransition] = useSpring(() => {
    const destinationButtonStyle = realmPanelVisible
      ? buttonStyles.visible
      : buttonStyles.hidden

    return {
      from: { ...buttonStyles.base, ...buttonStyles.hidden },
      to: { ...buttonStyles.base, ...destinationButtonStyle },
      config: {
        duration: REALM_PANEL_ANIMATION_TIME,
        easing: easings.easeOutCubic,
      },
    }
  }, [realmPanelVisible])

  return buttonTransition
}
