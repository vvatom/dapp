import React from "react"
import Icon from "shared/components/Icon"
import Button from "shared/components/Button"
import discordIcon from "shared/assets/icons/discord.svg"
import {
  selectAssistant,
  useDappDispatch,
  useDappSelector,
  setAssistant,
} from "redux-state"
import AssistantContent from "."

export default function AssistantJoin() {
  const { welcomePopup, questsPopup, visible } =
    useDappSelector(selectAssistant)
  const dispatch = useDappDispatch()

  const joinHandler = () => {
    // TODO: add link to discord
  }

  return (
    <>
      <AssistantContent
        isVisible={welcomePopup.closed && questsPopup.closed && visible}
        close={() => dispatch(setAssistant("close-popup"))}
      >
        <div className="header">I hope you are enjoying The Island Beta</div>
        <p className="paragraph">
          Have any questions or ideas? Join the conversation on Discord to share
          them!
        </p>
        <Button onClick={joinHandler}>
          <Icon
            src={discordIcon}
            width="18px"
            height="16px"
            type="image"
            color="var(--primary-p1-100)"
          />
          <span>Join Discord</span>
        </Button>
      </AssistantContent>
      <style jsx>{`
        .header {
          font-size: 22px;
          line-height: 32px;
          color: var(--secondary-s1-100);
          font-weight: 600;
          margin-bottom: 8px;
        }
        .paragraph {
          color: var(--secondary-s1-80);
          margin-bottom: 16px;
        }
      `}</style>
    </>
  )
}
