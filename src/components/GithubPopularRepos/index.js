// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const apiStatusContains = {
  initial: 'INITIAl',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

class GithubPopularRepos extends Component {
  state = {
    apiStatus: apiStatusContains.initial,
    repoData: [],
    activeLanguageId: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getRepositories()
  }

  getRepositories = async () => {
    const {activeLanguageId} = this.state
    this.setState({apiStatus: apiStatusContains.inProgress})
    const url = `https://apis.ccbp.in/popular-repos?language=${activeLanguageId}`
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      const formattedData = data.popular_repos.map(repo => ({
        name: repo.name,
        id: repo.id,
        issuesCount: repo.issues_count,
        forksCount: repo.forks_count,
        starsCount: repo.stars_count,
        avatarUrl: repo.avatar_url,
      }))

      this.setState({
        repoData: formattedData,
        apiStatus: apiStatusContains.success,
      })
    } else {
      this.setState({apiStatus: apiStatusContains.failure})
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader color="#0284c7" height={80} type="ThreeDots" width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="error-message">Something Went Wrong</h1>
    </div>
  )

  renderRepositoriesListView = () => {
    const {repoData} = this.state

    return (
      <ul className="repositories-list">
        {repoData.map(eachRepository => (
          <RepositoryItem
            key={eachRepository.id}
            repositoryDetails={eachRepository}
          />
        ))}
      </ul>
    )
  }

  renderRepositories = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusContains.success:
        return this.renderRepositoriesListView()
      case apiStatusContains.failure:
        return this.renderFailureView()
      case apiStatusContains.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  setActiveLanguageFilterId = newFilterId => {
    this.setState({activeLanguageId: newFilterId}, this.getRepositories)
  }

  renderLanguageFiltersList = () => {
    const {activeLanguageId} = this.state

    return (
      <ul className="filters-list">
        {languageFiltersData.map(eachLanguageFilter => (
          <LanguageFilterItem
            key={eachLanguageFilter.id}
            isActive={eachLanguageFilter.id === activeLanguageId}
            languageFilterDetails={eachLanguageFilter}
            setActiveLanguageFilterId={this.setActiveLanguageFilterId}
          />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="app-container">
        <div className="repo-container">
          <h1 className="main-heading">Popular</h1>
          {this.renderLanguageFiltersList()}
          {this.renderRepositories()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
