import React from "react"
import TahoAmount from "../shared/components/TahoAmount"
import Button from "../shared/components/Button"
import Icon from "../shared/components/Icon"
import Modal from "../shared/components/Modal"
import eyeIcon from "../shared/assets/icons/m/eye.svg"
import lightIcon from "../shared/assets/icons/m/light.svg"
import twitterIcon from "../shared/assets/icons/twitter.svg"
import copyIcon from "../shared/assets/icons/s/copy.svg"

export default function Referrals() {
  return (
    <Modal.Container type="map-only">
      <Modal.Content>
        <div className="referrals_container column_center">
          <div className="referrals_header">
            <h1>Refer & get 5% Bonus</h1>
            <div className="referrals_subheader">
              Each time someone uses your bonus link, you&apos;ll get 5% of all
              the TAHO they claim.
            </div>
          </div>

          <div className="referrals_link column">
            <div className="referrals_link_text">
              Your bonus link:{" "}
              <span className="link">taho.xyz/referral/0xabc...abc</span>
            </div>
            <div className="referrals_link_buttons row">
              <Button
                type="twitter"
                size="medium"
                iconSrc={twitterIcon}
                iconPosition="left"
                onClick={() => {}}
              >
                Share on Twitter
              </Button>
              <Button
                type="primary"
                size="medium"
                iconSrc={copyIcon}
                iconPosition="left"
                onClick={() => {}}
              >
                Copy link
              </Button>
            </div>
          </div>
          <div className="referrals_link_subtext row">
            <Icon src={eyeIcon} width="24px" color="var(--secondary-s1-70)" />
            Address will be visible in the link
          </div>
          <div className="referrals_received">
            <div className="referrals_background" />
            <div className="referrals_tip_header">
              Total bonus received so far
            </div>
            <TahoAmount amount={0} size="small" hasBackground />
            <div className="referrals_tip_container">
              <div className="referrals_tip row">
                <Icon
                  src={lightIcon}
                  width="24px"
                  color="var(--primary-p2-100)"
                />
                Tips on how to get the most out of your link
              </div>
              <p>
                Share the link during TIME-TIME <br />
                Share it directly to people you know have a claim
              </p>
            </div>
          </div>
        </div>
        <style jsx>{`
          .referrals_container {
            width: 812px;
            margin: 40px;
            gap: 40px;
            text-align: center;
          }
          .referrals_header {
            width: 500px;
          }
          .referrals_header h1 {
            font: var(--text-h1);
            font-size: 52px;
            letter-spacing: 1px;
            color: var(--secondary-s1-100);
          }
          .referrals_subheader {
            color: var(--secondary-s1-70);
            margin: 8px 40px 0;
          }
          .referrals_link {
            align-items: center;
            position: relative;
          }
          .referrals_link_text {
            border-radius: 16px;
            padding: 24px 24px 44px;
            background: var(--primary-p1-100);
            color: var(--secondary-s1-60);
          }
          .referrals_link_text .link {
            color: var(--secondary-s1-100);
          }
          .referrals_link_subtext {
            align-items: center;
            gap: 8px;
            color: var(--secondary-s1-70);
          }
          .referrals_link_buttons {
            position: absolute;
            bottom: -24px;
            gap: 16px;
          }
          .referrals_received {
            padding-top: 32px;
            position: relative;
            width: 428px;
            text-align: left;
          }
          .referrals_tip_header {
            color: var(--secondary-s1-60);
            text-align: center;
            margin-bottom: 16px;
          }
          .referrals_tip {
            color: var(--secondary-s1-60);
            align-items: center;
            gap: 4px;
            margin-bottom: 8px;
          }
          .referrals_tip_container {
            margin-top: 24px;
          }
          .referrals_tip_container p {
            padding-left: 28px;
            color: var(--secondary-s1-80);
          }
          .referrals_background {
            position: absolute;
            top: 0;
            left: -232px;
            width: 892px;
            height: calc(100% + 40px);
            background: var(--primary-p1-100);
            border-radius: 0 0 16px 16px;
            opacity: 0.7;
            z-index: -1;
          }
        `}</style>
      </Modal.Content>
    </Modal.Container>
  )
}
