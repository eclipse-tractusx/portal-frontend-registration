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

import { Dispatch } from 'redux'

export enum FileUploadStatus {
  DONE = 'done',
  UPLOADING = 'uploading',
  ERROR_UPLOAD = 'error_upload',
  ERROR_UPLOAD_PARAMS = 'error_upload_params',
}

export enum FileUploadVariant {
  SUCCESS = 'success',
  PRIMARY = 'primary',
  DANGER = 'danger',
}

export enum RequestState {
  NONE = 'none',
  SUBMIT = 'submit',
  OK = 'ok',
  ERROR = 'error',
}

export type FileStatus =
  | { stats: 'done'; file: File }
  | { stats: 'rejected_file_type'; remove?: () => void }
  | { stats: 'error_file_size'; remove: () => void }
  | { stats: 'rejected_max_files'; remove: () => void }

export type FileStatusValue = 'done' | 'rejected_file_type' | 'error_file_size'

export interface ProgressType {
  loaded: number
  total: number
}

export interface PostDocumentType {
  applicationId: string
  documentTypeId: string
  file: File
  handleUpdateProgress: (
    progress: ProgressType,
    dispatch: Dispatch,
    temporaryId: string
  ) => void
  dispatch: Dispatch
  temporaryId: string
}
