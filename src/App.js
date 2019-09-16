import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import 'bootstrap/dist/css/bootstrap.css'
import Congrats from './components/Congrats'
import GuessedWords from './components/GuessedWords'
import Input from './components/Input'
import { getSecretWord } from './actions'

export class UnconnectedApp extends Component {
  /**
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    this.props.getSecretWord()
  }

  render() {
    const { success, guessedWords, secretWord } = this.props
    return (
      <div className="container">
        <h1>Jotto</h1>
        <div>The secret word is {secretWord}</div>
        <Congrats success={success} />
        <Input />
        <GuessedWords guessedWords={guessedWords} />
      </div>
    )
  }
}

// const App = ({ success, guessedWords }) => (
//   <div className="container">
//     <h1>Jotto</h1>
//     <Congrats success={success} />
//     <Input />
//     <GuessedWords guessedWords={guessedWords} />
//   </div>
// )

export const mapStateToProps = state => {
  const { success, guessedWords, secretWord } = state
  return { success, guessedWords, secretWord }
}
export const mapDispatchToProps = dispatch => bindActionCreators({ getSecretWord }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedApp)
