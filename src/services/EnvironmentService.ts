/********************************************************************************
 * Copyright (c) 2021,2022 BMW Group AG
 * Copyright (c) 2021,2022 Contributors to the Eclipse Foundation
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

declare let ENV: any;

export const getHostname = () => window.location.hostname

export const isLocal = () => getHostname() === 'localhost'

const PORTAL_FRONTEND_URL = () => ENV.PORTAL_FRONTEND_URL

export const getApiBase = () => ENV.PORTAL_BACKEND_URL

export const getAssetBase = () =>
  `${isLocal() ? PORTAL_FRONTEND_URL : ''}/assets`

export const getCentralIdp = () => typeof ENV === 'undefined' ? '' : ENV.CENTRALIDP_URL

const EnvironmentService = {
  isLocal,
  getHostname,
  getApiBase,
  getAssetBase,
  getCentralIdp,
}

export default EnvironmentService
