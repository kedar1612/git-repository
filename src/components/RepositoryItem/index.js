// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repositoryDetails} = props
  const {
    name,
    issuesCount,
    forksCount,
    starsCount,
    avatarUrl,
  } = repositoryDetails

  return (
    <li className="repo-item">
      <img src={avatarUrl} alt={name} className="repo-image" />
      <h1 className="name">{name}</h1>
      <div className="stats-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="stats-image"
        />
        <p className="stats-text">{starsCount}</p>
      </div>
      <div className="stats-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="stats-image"
        />
        <p className="stats-text">{forksCount}</p>
      </div>
      <div className="stats-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="stats-image"
        />
        <p className="stats-text">{issuesCount}</p>
      </div>
    </li>
  )
}

export default RepositoryItem
