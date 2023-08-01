import React from "react"
import classnames from "classnames"

type ButtonProps = {
  children: string
  type?: "primary" | "secondary" | "tertiary"
  size?: "medium" | "large"
  isDisabled?: boolean
  isInactive?: boolean
  iconPosition?: "left" | "right"
  iconSrc?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default function Button({
  children,
  type = "primary",
  size = "medium",
  isDisabled = false,
  isInactive = false,
  iconPosition = "right",
  iconSrc,
  onClick,
}: ButtonProps) {
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className={classnames({
          button: true,
          primary: type === "primary",
          secondary: type === "secondary",
          tertiary: type === "tertiary",
          medium: size === "medium",
          large: size === "large",
          reversed: iconPosition === "left",
          disabled: isDisabled,
          inactive: isInactive,
        })}
      >
        {children}
        {iconSrc && <span className="icon" />}
      </button>
      <style jsx>
        {`
          .button {
            display: flex;
            width: fit-content;
            align-items: center;
            justify-content: center;
            border: 0;
            cursor: pointer;
            font-style: normal;
            letter-spacing: 0.5px;
            box-sizing: border-box;
            transition: all 50ms;
            gap: 8px;
          }

          .large {
            font-family: "QuincyCF";
            font-size: 23px;
            font-weight: 700;
            padding: 20px 32px;
            border-radius: 56px;
          }
          .medium {
            font-family: "Segment";
            font-size: 18px;
            font-weight: 600;
            line-height: 24px;
            padding: 12px 28px;
            border-radius: 28px;
          }
          .secondary.large {
            padding: 18px 30px;
          }
          .secondary.medium {
            padding: 10px 26px;
          }

          .primary {
            color: var(--primary-p1-100);
            background: linear-gradient(180deg, #ed9a26 0%, #dc8a17 100%);
            box-shadow: 0px 7px 5px 0px rgba(13, 35, 33, 0.5),
              0px 18px 20px 0px rgba(13, 35, 33, 0.5),
              0px 4px 6px 0px rgba(232, 150, 34, 0.4),
              0px 4px 4px 0px rgba(13, 35, 33, 0.45);
          }
          .primary:hover {
            background: linear-gradient(180deg, #ffbb5b 0%, #ffb143 100%);
          }
          .primary:active {
            background: linear-gradient(180deg, #ed9a26 0%, #dc8a17 100%);
          }
          .primary .icon {
            background-color: var(--primary-p1-100);
          }

          .secondary {
            color: var(--primary-p2-100);
            background-color: transparent;
            border: 2px solid var(--primary-p2-100);
          }
          .secondary .icon {
            background-color: var(--primary-p2-100);
          }
          .secondary:hover {
            color: var(--primary-p2-80);
            border-color: var(--primary-p2-80);
          }
          .secondary:hover .icon {
            background-color: var(--primary-p2-80);
          }
          .secondary:active {
            color: var(--primary-p2-120);
            border-color: var(--primary-p2-120);
          }
          .secondary:active .icon {
            background-color: var(--primary-p2-120);
          }

          .tertiary {
            color: var(--primary-p2-100);
            background: transparent;
            padding: 4px 0;
          }
          .tertiary .icon {
            background-color: var(--primary-p2-100);
          }
          .tertiary:hover {
            color: var(--primary-p2-80);
          }
          .tertiary:hover .icon {
            background-color: var(--primary-p2-80);
          }
          .tertiary:active {
            color: var(--primary-p2-120);
          }
          .tertiary:active .icon {
            background-color: var(--primary-p2-120);
          }
          .tertiary.disabled,
          .tertiary.disabled:hover,
          .tertiary.disabled:active {
            color: var(--secondary-s1-40);
            background: transparent;
          }
          .tertiary.disabled .icon {
            background-color: var(--secondary-s1-40);
          }

          .disabled,
          .disabled:hover,
          .disabled:active {
            pointer-events: none;
            box-shadow: 0 0 0 0 transparent;
            cursor: auto !important;
          }

          .primary.disabled,
          .primary.disabled:hover,
          .primary.disabled:active {
            box-shadow: 0 0 0 0 transparent;
            background: linear-gradient(
              180deg,
              rgba(237, 154, 38, 0.5) 0%,
              rgba(220, 138, 23, 0.5) 100%
            );
          }

          .secondary.disabled {
            border-color: var(--secondary-s1-40);
            color: var(--secondary-s1-40);
          }
          .secondary.disabled .icon {
            background-color: var(--secondary-s1-40);
          }

          .icon {
            -webkit-mask-image: url(${iconSrc});
            mask-image: url(${iconSrc});
            -webkit-mask-size: cover;
            mask-size: cover;
          }
          .medium .icon {
            width: 16px;
            height: 16px;
          }
          .large .icon {
            width: 24px;
            height: 24px;
          }

          .reversed {
            flex-direction: row-reverse;
          }
        `}
      </style>
    </>
  )
}
