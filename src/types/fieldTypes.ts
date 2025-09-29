import type { TextFieldProps } from "../components/TextField"
import type { SelectListProps } from "../components/SelectList"
import type { TextAreaProps } from "../components/TextArea"
import type { PhotoUploaderProps } from "../components/PhotoUploader"

export enum FIELD_KINDS {
  TEXT = "text",
  TEXTAREA = "textarea",
  SELECT = "select",
  PHOTO = "photo",
  SUBMIT = "submit",
}

export const COMMON_ATTRIBUTES = {
  LABEL: 'label',
  NAME: 'name',
  TYPE: 'type',
  PLACEHOLDER: 'placeholder',
  REQUIRED: 'required',
  ERROR: 'error',
  DISABLED: 'disabled',
} as const