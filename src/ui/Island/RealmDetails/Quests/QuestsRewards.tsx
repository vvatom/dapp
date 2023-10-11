import React from "react"
import Accordion from "shared/components/Accordion"
import Icon from "shared/components/Icon"
import contactsIcon from "shared/assets/icons/m/contacts.svg"
import starIcon from "shared/assets/icons/star.svg"

export default function QuestsRewards({
  quests,
}: {
  quests: { name: string; description: string }[]
}) {
  return (
    <div>
      <h3 className="header row">
        Your weekly action needed to receive rewards
        <div className="header_icon row_center">
          <Icon
            color="var(--secondary-s1-60)"
            src={contactsIcon}
            width="18px"
          />
          Rulebook
        </div>
      </h3>
      <div className="rewards_quests column">
        {quests.map(({ name, description }) => (
          <Accordion
            key={name}
            title={name}
            icon={starIcon}
            iconColor="var(--semantic-success)"
            type="frame"
          >
            <div className="rewards_quests_description">{description}</div>
          </Accordion>
        ))}
      </div>
      <style jsx>{`
        .header {
          margin-bottom: 8px;
          justify-content: space-between;
        }
        .header_icon {
          color: var(--secondary-s1-60);
          font: var(--text-label);
          gap: 8px;
        }
        .rewards_quests {
          gap: 20px;
        }
        .rewards_quests_description {
          color: var(--secondary-s1-80);
          padding: 0 16px 0px 25px;
        }
      `}</style>
    </div>
  )
}