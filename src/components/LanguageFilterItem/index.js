// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {isActive, languageFilterDetails, setActiveLanguageFilterId} = props
  const {id, language} = languageFilterDetails
  const btnClassName = isActive ? 'btn-language active-btn' : 'btn-language'

  const onClickLanguage = () => {
    setActiveLanguageFilterId(id)
  }
  return (
    <li className="language-item">
      <button type="button" className={btnClassName} onClick={onClickLanguage}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
