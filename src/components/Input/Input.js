import React, { Component } from 'react'
import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'
import { guessWord } from '../../actions'

export class UnconnectedInput extends Component {
  constructor() {
    super()
    this.state = {
      currentGuess: ''
    }
    this.submitGuessedWord = this.submitGuessedWord.bind(this)
  }

  submitGuessedWord(e) {
    e.preventDefault()
    const guessedWord = this.state.currentGuess
    if (guessedWord && guessedWord.length > 0) {
      this.props.guessWord(guessedWord)
      this.setState({ currentGuess: '' })
    }
  }

  render() {
    const { success } = this.props
    return (
      <div data-test="component-input">
        {!success ? (
          <div>
            <form className="form-inline">
              <input
                data-test="input-box"
                className="mb-2 mx-sm-3"
                id="word-guess"
                type="text"
                value={this.state.currentGuess}
                onChange={e => this.setState({ currentGuess: e.target.value })}
                placeholder="Enter guesss"
              />
              <button
                onClick={this.submitGuessedWord}
                data-test="submit-button"
                type="submit"
                className="btn btn-primary"
              >
                Submit
              </button>
            </form>
          </div>
        ) : null}
      </div>
    )
  }
}

export const mapStateToProps = ({ success }) => {
  return { success }
}
export const mapDispatchToProps = dispatch => bindActionCreators({ guessWord }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedInput)
