/********************************************************************************
 * Copyright (c) 2021,2022 Microsoft and BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the CatenaX (ng) GitHub Organisation.
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

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
