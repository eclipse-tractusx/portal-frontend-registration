/********************************************************************************
 * Copyright (c) 2021, 2023 Microsoft and BMW Group AG
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

import { AiOutlineMail } from 'react-icons/ai'
import ReactTooltip from 'react-tooltip'
import CircularProgress from '@mui/material/CircularProgress';

const Button = ({
  label,
  styleClass,
  handleClick,
  icon = false,
  showTooltip = false,
  tooltipText = '',
  disabled = false,
  loading = false,
}) => {
  return showTooltip ? (
    <>
      <ReactTooltip
        className="tooltip"
        id="tooltipBtn"
        place="top"
        effect="solid"
      >
        {tooltipText}
      </ReactTooltip>
      <div data-tip data-for="tooltipBtn">
        <button
          className={styleClass}
          onClick={handleClick}
          color="#CBCBCB"
          disabled
        >
          {!icon ? (
            label
          ) : (
            <>
              <AiOutlineMail className="button-icon" /> <span>{label}</span>
            </>
          )}
        </button>
      </div>
    </>
  ) : (
    loading ?
      <button className={styleClass} onClick={handleClick} disabled={disabled} style={{display: 'flex', alignItems: 'center'}}>
        {
          <>
          <CircularProgress
            sx={{ color: '#fff', marginRight: '5px' }}
            size={20}
          />
            {label}
          </>
        }
      </button>
      :
      <button className={styleClass} onClick={handleClick} disabled={disabled}>
        {!icon ? (
          label
        ) : (
          <>
            <AiOutlineMail className="button-icon" /> <span>{label}</span>
          </>
        )}
      </button>
  )
}

export default Button
