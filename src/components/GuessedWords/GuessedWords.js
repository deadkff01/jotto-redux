import React from 'react'
import PropTypes from 'prop-types'

const Content = <span data-test="guess-instructions">Try to guess the secret word!</span>

const GuessedWordsTable = guessedWords => {
  const guessedWordsRows = guessedWords.map((word, index) => (
    <tr data-test="guessed-word" key={index}>
      <td>{word.guessedWord}</td>
      <td>{word.letterMatchCount}</td>
    </tr>
  ))

  return (
    <div data-test="guessed-words">
      <h3>Guessed Words</h3>
      <table className="table table-sm">
        <thead className="thead-light">
          <tr>
            <th>Guess</th>
            <th>Matching Letters</th>
          </tr>
        </thead>
        <tbody>{guessedWordsRows}</tbody>
      </table>
    </div>
  )
}

const GuessedWords = ({ guessedWords }) => (
  <div data-test="component-guessed-words">{guessedWords.length === 0 ? Content : GuessedWordsTable(guessedWords)}</div>
)

GuessedWords.propTypes = {
  guessedWords: PropTypes.arrayOf(
    PropTypes.shape({
      guessedWord: PropTypes.string.isRequired,
      letterMatchCount: PropTypes.number.isRequired
    })
  ).isRequired
}

export default GuessedWords
