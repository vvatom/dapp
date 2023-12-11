import React from "react"
import {
  // selectSeasonDurationInWeeks,
  selectSeasonWeek,
  selectWeekEndDate,
  useDappSelector,
} from "redux-state"
// import { getNextSelectedWeekDay, getTimeRemaining } from "shared/utils"

export default function RealmPanelCountdown() {
  const seasonWeek = useDappSelector(selectSeasonWeek)
  // TODO: for now we are hardcoding the season duration to 7 weeks to get better UX
  const seasonDuration = 7 // useDappSelector(selectSeasonDurationInWeeks)
  const weekEndDate = useDappSelector(selectWeekEndDate)

  if (!weekEndDate) return null

  // const nextDropTimestamp = getNextSelectedWeekDay(4, 17) // 17:00 UTC time
  // const timeRemaining = getTimeRemaining(nextDropTimestamp)

  return (
    <>
      <div className="countdown row">
        <div className="column">
          <div className="week">
            Week {seasonWeek}{" "}
            <span style={{ fontSize: 16, color: "var(--secondary-s1-50)" }}>
              / {seasonDuration}
            </span>
          </div>
          {/* <div className="time_remaining">{timeRemaining}</div> */}
          <div className="time_remaining">
            Beta is over, claim XP till Dec 18 2023
          </div>
        </div>
      </div>
      <style jsx>{`
        .countdown {
          position: absolute;
          text-align: right;
          top: 104px;
          right: 32px;
        }
        .week {
          font-size: 16px;
          color: var(--secondary-s1-80);
        }
        .time_remaining {
          font-size: 20px;
          font-weight: 400;
          line-height: 32px;
        }
      `}</style>
    </>
  )
}
