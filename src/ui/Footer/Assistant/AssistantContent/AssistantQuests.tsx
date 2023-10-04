import React from "react"
import Icon from "shared/components/Icon"
import starIcon from "shared/assets/icons/star-2.svg"
import AssistantContent, { AssistantContentProps } from "."

export default function AssistantQuests({
  isVisible,
  close,
}: AssistantContentProps) {
  return (
    <>
      <AssistantContent isVisible={isVisible} close={close}>
        <div className="header">
          You are now a Citizen of Arbiland, I think you&apos;ll like it here!
        </div>
        <div className="hint row">
          <Icon
            src={starIcon}
            height="32px"
            width="32px"
            style={{ marginTop: 9 }}
            type="image"
            color="var(--semantic-success)"
          />
          <p>
            Let&apos;s start earning XP
            <br /> by completing Quests
          </p>
        </div>
        <div className="paragraph row_center">
          <p>
            You can see this week&apos;s Quests under the <span>Quest Bar</span>
            . You&apos;ll be able to redeem XP in the future for rewards.
          </p>
        </div>
      </AssistantContent>
      <style jsx>{`
        .header {
          font-size: 22px;
          line-height: 32px;
          color: var(--secondary-s1-100);
          font-weight: 600;
          margin-bottom: 16px;
        }
        .paragraph {
          color: var(--secondary-s1-80);
          height: 96px;
        }
        .paragraph span {
          color: var(--secondary-s1-100);
        }
        .hint {
          margin-bottom: 16px;
        }
        .hint p {
          font-size: 22px;
          font-weight: 600;
          line-height: 32px;
          flex: 1;
          padding-left: 16px;
        }
      `}</style>
    </>
  )
}