import React, { useState } from "react"
import {
  useDappSelector,
  selectWalletAvatar,
  selectWalletName,
} from "redux-state"
import { getRegionData } from "shared/constants"
import RegionIcon from "shared/components/RegionIcon"
import AccountDropdown from "./AccountDropdown"

// TODO: use region for given account
const regionMock = { name: "KryptoKeep", id: "4" }

export default function AccountInfo() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const name = useDappSelector(selectWalletName)
  const avatar = useDappSelector(selectWalletAvatar)
  const region = regionMock
    ? getRegionData(regionMock.id.toString())
    : undefined

  if (!name) return null

  return (
    <div className="account_container row">
      {isDropdownOpen && <AccountDropdown />}
      {regionMock && (
        <div className="region_container row">
          {region && (
            <RegionIcon regionId={region.id} type="fill" color="#f4d03f" />
          )}
          <span className="region_label">{regionMock.name}</span>
        </div>
      )}
      <button type="button" onClick={() => setIsDropdownOpen((prev) => !prev)}>
        <span className="account_label ellipsis">{name}</span>
        <div className="avatar" />
      </button>
      <style jsx>
        {`
          .account_container {
            position: relative;
            align-items: center;

            font-family: var(--sans);
            font-style: normal;
            font-weight: 500;
            line-height: 24px;
          }

          .region_container {
            align-items: center;
            margin-right: 25px;
            gap: 6px;
          }

          .region_label {
            color: #f4d03f;
          }

          .account_label {
            color: var(--secondary-s1-80);
            max-width: 150px;
            transition: color 250ms ease;
          }

          .avatar {
            width: 42px;
            height: 42px;
            margin-left: 8px;
            background: url("${avatar}");
            background-size: cover;
            border-radius: 50%;
            transform: scaleX(-1);
            border: 2px solid var(--primary-p1-100);
            transition: border-color 250ms ease;
          }

          button {
            all: unset;
            cursor: pointer;
            display: flex;
            align-items: center;
          }

          button:hover .account_label {
            color: var(--primary-p2-100);
          }

          button:hover .avatar {
            border-color: var(--primary-p2-100);
          }
        `}
      </style>
    </div>
  )
}
