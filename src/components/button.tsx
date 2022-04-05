import { AiOutlineMail } from 'react-icons/ai'
import ReactTooltip from 'react-tooltip'

const Button = ({
  label,
  styleClass,
  handleClick,
  icon = false,
  showTooltip = false,
  tooltipText = '',
}) => {
  return showTooltip ? (
    <>
      <ReactTooltip
        className="tooltip"
        id="tooltipBtn"
        place="top"
        effect="solid"
      >
        {tooltipText}
      </ReactTooltip>
      <div data-tip data-for="tooltipBtn">
        <button
          className={styleClass}
          onClick={handleClick}
          color="#939393"
          disabled
        >
          {!icon ? (
            label
          ) : (
            <>
              <AiOutlineMail className="button-icon" /> <span>{label}</span>
            </>
          )}
        </button>
      </div>
    </>
  ) : (
    <button className={styleClass} onClick={handleClick}>
      {!icon ? (
        label
      ) : (
        <>
          <AiOutlineMail className="button-icon" /> <span>{label}</span>
        </>
      )}
    </button>
  )
}

export default Button
