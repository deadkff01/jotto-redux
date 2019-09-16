import React from 'react'
import { shallow } from 'enzyme'
import { findByTestAttr, checkProps } from '../../../test/testUtils'
import Congrats from './Congrats'

const defaultProps = { success: true }

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props }
  return shallow(<Congrats {...setupProps} />)
}

test('render withou errors', () => {
  const wrapper = setup({ success: false })
  const component = findByTestAttr(wrapper, 'component-congrats')
  expect(component.length).toBe(1)
})

test('render no text when `seccess` props is false', () => {
  const wrapper = setup({ success: false })
  const component = findByTestAttr(wrapper, 'component-congrats')
  expect(component.text()).toBe('')
})

test('render no empty congrats message when `seccess` props is true', () => {
  const wrapper = setup({ success: true })
  const message = findByTestAttr(wrapper, 'congrats-message')
  expect(message.text().length).not.toBe(0)
})

test('does not throw error with expeted props', () => {
  const expectedProps = { success: false }
  checkProps(Congrats, expectedProps)
})
