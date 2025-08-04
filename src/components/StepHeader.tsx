/********************************************************************************
 * Copyright (c) 2024 Contributors to the Eclipse Foundation
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

type StepHeaderProps = {
  step: number
  stepName: string
  stepDescription: string
  className?: string
  additionalDescription?: string
}
const StepHeader = ({
  step,
  stepName,
  stepDescription,
  className = '',
  additionalDescription = '',
}: StepHeaderProps) => {
  return (
    <div className={`head-section ${className}`}>
      <div className="mx-auto step-highlight d-flex align-items-center justify-content-center">
        {step}
      </div>
      <h4 className="mx-auto d-flex align-items-center justify-content-center">
        {stepName}
      </h4>
      <div className="mx-auto text-center col-9 subheader">
        <span className="additonal-subheader">{additionalDescription}</span>
        {stepDescription}
      </div>
    </div>
  )
}

export default StepHeader
