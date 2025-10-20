import accessibleAutocomplete from 'accessible-autocomplete'

export class SearchElement extends HTMLElement {
  constructor() {
    super()

    this.statusMessage = null
    this.$container = this.querySelector('.nhsuk-header__search')
    this.$searchForm = this.querySelector('.nhsuk-header__search-form')
    this.$searchInput = this.querySelector('.nhsuk-header__search-input')
    this.searchIndex = null
    this.searchIndexUrl = this.getAttribute('index')
    this.searchResults = []
    this.searchTimeout = 10
  }

  async fetchSearchIndex(indexUrl) {
    this.statusMessage = 'Loading search index'

    try {
      const response = await fetch(indexUrl, {
        signal: AbortSignal.timeout(this.searchTimeout * 1000)
      })

      if (!response.ok) {
        throw Error('Search index not found')
      }

      const json = await response.json()
      this.statusMessage = 'No results found'
      this.searchIndex = json
    } catch (error) {
      this.statusMessage = 'Failed to load search index'
      console.error(this.statusMessage, error.message)
    }
  }

  findResults(searchQuery, searchIndex) {
    return searchIndex.filter((item) => {
      const regex = new RegExp(searchQuery, 'gi')
      return (
        item?.title?.match(regex) ||
        item?.description?.match(regex) ||
        item?.tokens?.match(regex)
      )
    })
  }

  renderResults(query, populateResults) {
    if (!this.searchIndex) {
      return populateResults(this.searchResults)
    }

    this.searchResults = this.findResults(query, this.searchIndex).reverse()

    populateResults(this.searchResults)
  }

  handleOnConfirm(result) {
    const path = result.url
    if (!path) {
      return
    }

    window.location.href = path
  }

  handleNoResults() {
    return this.statusMessage
  }

  inputValueTemplate(result) {
    if (result) {
      return result.title
    }
  }

  suggestionTemplate(result) {
    if (result) {
      const container = document.createElement('span')

      // Add title of result to container
      const title = document.createElement('span')
      title.className = 'app-search__option-title'
      title.textContent = result.title

      container.appendChild(title)

      // Add section and/or data to container
      if (result.date || result.section) {
        const section = document.createElement('span')
        section.className = 'app-search__option-metadata'

        section.innerHTML =
          result.date && result.section
            ? `${result.section}<br>${result.date}`
            : result.section || result.date

        container.appendChild(section)
      }

      return container.innerHTML
    }
  }

  async connectedCallback() {
    if (!this.searchIndexUrl) {
      return
    }

    await this.fetchSearchIndex(this.searchIndexUrl)

    this.$searchForm.hidden = true

    return accessibleAutocomplete({
      element: this.$container,
      id: this.$searchInput.id,
      cssNamespace: 'app-search',
      inputClasses: 'nhsuk-header__search-input nhsuk-input',
      displayMenu: 'overlay',
      minLength: 2,
      confirmOnBlur: false,
      placeholder: this.$searchInput.placeholder,
      source: this.renderResults.bind(this),
      onConfirm: this.handleOnConfirm,
      templates: {
        inputValue: this.inputValueTemplate,
        suggestion: (value) => this.suggestionTemplate(value)
      },
      tNoResults: this.handleNoResults.bind(this)
    })
  }
}
