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

import { ILayoutProps } from 'react-dropzone-uploader'
import { useTranslation } from 'react-i18next'

interface CustomLayoutProps extends ILayoutProps {
  error: string
  documentError: string
}

function DragdropLayout(props: CustomLayoutProps) {
  const { t } = useTranslation()

  return (
    <div>
      <div {...props.dropzoneProps}>{props.input}</div>
      {props.documentError && (
        <div className="text-danger ms-4 mt-2 fw-bold-600 fw-font-12">
          {t('documentUpload.dragDropExceedSizeErrorMsg')}
        </div>
      )}
      {props.error && (
        <div className="text-danger ms-4 mt-2 fw-bold-600 fw-font-12">
          {props.error}
        </div>
      )}
    </div>
  )
}

export default DragdropLayout
