/********************************************************************************
 * Copyright (c) 2021, 2023 BMW Group AG
 * Copyright (c) 2021, 2023 Contributors to the Eclipse Foundation
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

export const Patterns = {
    BPN: /^BPNL[a-z0-9]{12}$/i,
    CITY: /^[A-ZÀ-ÿ0-9](([ .'-]|\. )?[A-Za-zÀ-ÿ0-9]{1,40}){1,10}$/,
    STREET: /^([a-zA-Z0-9À-ÿš]{1,40}( ?[.,'-] ?| )?){1,10}[a-zA-Z0-9À-ÿš.]$/,
}

export const isBPN = (expr: string) => Patterns.BPN.test(expr)
export const isCity = (expr: string) => Patterns.CITY.test(expr)
export const isStreet = (expr: string) => Patterns.STREET.test(expr)
