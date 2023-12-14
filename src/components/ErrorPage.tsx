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

import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import Button from './button'

export const ErrorPage = () => {
  const { t } = useTranslation()
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '20%',
        left: '16%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 'auto auto',
      }}
    >
      <Box
        sx={{
          minWidth: '400px',
        }}
      >
        <img
          src="/registration/robot-sw.925342207cc863d3ed2cc9c65ffb7c33.svg"
          alt=""
        />
      </Box>
      <Box>
        <Typography
          variant="h5"
          sx={{
            fontFamily: 'LibreFranklin-Light',
            fontWeight: '600',
            marginBottom: '10px',
          }}
        >
          {t('errorPage.heading')}
        </Typography>
        <Typography
          variant="body1"
          style={{
            fontSize: '18px',
            fontFamily: 'LibreFranklin-Light',
            marginBottom: '20px',
          }}
        >
          {t('errorPage.title')}
        </Typography>
        <Typography
          variant="body1"
          style={{
            fontFamily: 'LibreFranklin-Light',
            fontSize: '18px',
            width: '640px',
            marginBottom: '20px',
          }}
        >
          {t('errorPage.description')}
        </Typography>
        <Box
          sx={{
            position: 'absolute',
            left: '60%',
          }}
        >
          <Button
            label={t('button.reload')}
            styleClass="button btn-default"
            handleClick={() => location.reload()}
          />
        </Box>
      </Box>
    </Box>
  )
}
