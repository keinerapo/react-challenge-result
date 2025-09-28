import type { TextFieldProps } from "../components/TextField"
import type { SelectListProps } from "../components/SelectList"
import type { TextAreaProps } from "../components/TextArea"
import type { PhotoUploaderProps } from "../components/PhotoUploader"

export const COMMON_ATTRIBUTES = {
  LABEL: 'label',
  NAME: 'name',
  PLACEHOLDER: 'placeholder',
  REQUIRED: 'required',
  ERROR: 'error',
  DISABLED: 'disabled',
} as const

export const TEXT_INPUT_ATTRIBUTES = {
  LABEL: 'label',
  NAME: 'name',
  PLACEHOLDER: 'placeholder',
  REQUIRED: 'required',
  ERROR: 'error',
  DISABLED: 'disabled',
  TYPE: 'type',
  MAX_LENGTH: 'max-length',
  MIN_LENGTH: 'min-length',
  NO_NUMBERS: 'no-numbers',
} as const

export const TEXT_AREA_ATTRIBUTES = {
  LABEL: 'label',
  NAME: 'name',
  PLACEHOLDER: 'placeholder',
  REQUIRED: 'required',
  ERROR: 'error',
  DISABLED: 'disabled',
  ROWS: 'rows',
  COLS: 'cols',
  MAX_LENGTH: 'max-length',
  MIN_LENGTH: 'min-length',
} as const

export const SELECT_LIST_ATTRIBUTES = {
  LABEL: 'label',
  NAME: 'name',
  PLACEHOLDER: 'placeholder',
  REQUIRED: 'required',
  ERROR: 'error',
  DISABLED: 'disabled',
  OPTIONS: 'options',
  MULTIPLE: 'multiple',
} as const

export const PHOTO_UPLOADER_ATTRIBUTES = {
  LABEL: 'label',
  NAME: 'name',
  PLACEHOLDER: 'placeholder',
  REQUIRED: 'required',
  ERROR: 'error',
  DISABLED: 'disabled',
  ACCEPTED_TYPES: 'accepted-types',
  MAX_PHOTOS: 'max-photos',
  MAX_DIMENSIONS: 'max-dimensions',
} as const

export const SUBMIT_BUTTON_ATTRIBUTES = {
  LABEL: 'label',
  DISABLED: 'disabled',
  TYPE: 'type',
  VARIANT: 'variant',
  FORM_VALID: 'form-valid',
} as const

export const FORM_STEP_ATTRIBUTES = {
  TITLE: 'title',
} as const

export const COMPONENT_ATTRIBUTES = {
  TEXT_FIELD: Object.values(TEXT_INPUT_ATTRIBUTES),
  TEXT_AREA: Object.values(TEXT_AREA_ATTRIBUTES),
  SELECT_LIST: Object.values(SELECT_LIST_ATTRIBUTES),
  PHOTO_UPLOADER: Object.values(PHOTO_UPLOADER_ATTRIBUTES),
  SUBMIT_BUTTON: Object.values(SUBMIT_BUTTON_ATTRIBUTES),
  FORM_STEP: Object.values(FORM_STEP_ATTRIBUTES),
} as const

export type TextFieldConfig = Pick<
  TextFieldProps,
  typeof COMMON_ATTRIBUTES.NAME | typeof COMMON_ATTRIBUTES.LABEL | typeof COMMON_ATTRIBUTES.PLACEHOLDER | 
  typeof COMMON_ATTRIBUTES.REQUIRED | typeof TEXT_INPUT_ATTRIBUTES.TYPE | "minLength" | "maxLength"
> & { 
  kind: "text"
  noNumbers?: boolean
}

export type TextAreaConfig = Pick<
  TextAreaProps,
  typeof COMMON_ATTRIBUTES.NAME | typeof COMMON_ATTRIBUTES.LABEL | typeof COMMON_ATTRIBUTES.PLACEHOLDER | typeof COMMON_ATTRIBUTES.REQUIRED
> & { 
  kind: "textarea"
  minLength?: number
  maxLength?: number
}

export type SelectFieldConfig = Pick<
  SelectListProps,
  typeof COMMON_ATTRIBUTES.NAME | typeof COMMON_ATTRIBUTES.LABEL | typeof COMMON_ATTRIBUTES.REQUIRED | typeof SELECT_LIST_ATTRIBUTES.OPTIONS
> & { kind: "select" }

export type PhotoFieldConfig = Pick<
  PhotoUploaderProps,
  typeof COMMON_ATTRIBUTES.NAME | typeof COMMON_ATTRIBUTES.LABEL | typeof COMMON_ATTRIBUTES.REQUIRED
> & { 
  kind: "photo"
  maxPhotos?: number
  maxDimensions?: { width: number; height: number }
}

export type SubmitFieldConfig = { 
  kind: "submit"; 
  [SUBMIT_BUTTON_ATTRIBUTES.LABEL]?: string 
}

export type FieldConfig =
  | TextFieldConfig
  | TextAreaConfig
  | SelectFieldConfig
  | PhotoFieldConfig
  | SubmitFieldConfig
