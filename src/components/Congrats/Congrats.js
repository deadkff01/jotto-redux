import React from 'react'
import PropTypes from 'prop-types'

/**
 * Function react component for congrulatory message
 *
 * @function
 * @returns {JSX.Element} - Rendered component (or null if 'success' prop is false)
 */

const Congrats = ({ success }) =>
  success ? (
    <div data-test="component-congrats" className="alert alert-success">
      <span data-test="congrats-message">Congratulations! You guessed word</span>
    </div>
  ) : (
    <div data-test="component-congrats" />
  )

Congrats.propTypes = {
  success: PropTypes.bool.isRequired
}

export default Congrats
