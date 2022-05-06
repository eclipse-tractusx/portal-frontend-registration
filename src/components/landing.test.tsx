import React from 'react'
import { render, screen } from '@testing-library/react'
import Landing from './landing'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '../state/store'
import i18n from '../i18n'

describe('testSuite', () => {
  beforeEach(() => {
    i18n.init()
  })

  test('Render Landing Page', () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Landing />
        </MemoryRouter>
      </Provider>
    )
    expect(container.querySelector('.container-body')).toBeInTheDocument()
    expect(container.querySelector('.bullet-points')).toBeInTheDocument()
    expect(
      screen.getByText('Welcome to Catena-X - The Automotive Network')
    ).toBeInTheDocument()
  })

  test('renders buttons', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Landing />
        </MemoryRouter>
      </Provider>
    )
    const items = await screen.findAllByRole('button')
    expect(items).toHaveLength(2)
  })
})
