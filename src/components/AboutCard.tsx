/********************************************************************************
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
import OpenInNewIcon from '@mui/icons-material/OpenInNew'

function LinkText(props: LinkType) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        padding: '20px 20px',
        cursor: 'pointer',
        placeItems: 'center',
      }}
      onClick={() => window.open(props.url, '_blank')}
    >
      <Typography variant="body1">{props.text}</Typography>
      <OpenInNewIcon />
    </Box>
  )
}

function TitleText(props: LinkType) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        padding: '20px 20px',
        cursor: 'pointer',
        placeItems: 'center',
      }}
      onClick={() => window.open(props.url, '_blank')}
    >
      <Typography
        variant="h6"
        sx={{
          paddingRight: '10px',
          textTransform: 'uppercase',
          fontWeight: '600',
        }}
      >
        {props.text}
      </Typography>
      <OpenInNewIcon />
    </Box>
  )
}

type LinkType = {
  text: string
  url: string
}

export const AboutCard = (props: {
  name: string
  repositoryPath: string
  license: string
  licensePath: string
  noticePath: string
  sourcePath: string
  commitId: string
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        maxWidth: '800px',
        alignItems: 'center',
        marginTop: '30px',
      }}
    >
      <Box
        sx={{
          background: '#FFFFFF',
          boxShadow: '0px 5px 10px rgba(80, 80, 80, 0.3)',
          borderRadius: '8px',
          width: '100%',
        }}
      >
        <Box>
          <TitleText text={props.name} url={props.repositoryPath} />
          {props.license && props.licensePath && (
            <LinkText text={`License ${props.license}`} url={props.licensePath} />
          )}
          {props.noticePath && (
            <LinkText text="Notice" url={props.noticePath} />
          )}
          {props.sourcePath && (
            <LinkText text="Source" url={props.sourcePath} />
          )}
          {props.commitId && (
            <Box>
              <Typography
                variant="body1"
                sx={{
                  padding: '20px 20px',
                  textAlign: 'left',
                }}
              >
                Commit ID: {props.commitId}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}
