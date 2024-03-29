import { Input } from "../Input";
import { Label } from "../Label";
import { FieldContent } from "./style";

export const BoxInput = ({
  fieldWidth = 100,
  editable = false,
  textLable,
  placeholder,
  fieldValue = null,
  onchangeText = null,
  KeyType = "default",
  maxLenght,
  onBlur,
}) => {
  return (
    <FieldContent fieldWidth={fieldWidth}>

      {/* /Label */}
      <Label textLabel={textLable}/>

      {/* //Input */}
      <Input
        placeholder= {placeholder}
        editable= {editable}
        KeyType = {KeyType}
        maxLenght= {maxLenght}
        fieldValue= {fieldValue}
        onchangeText= {onchangeText}
        onBlur={onBlur}
      />
    </FieldContent>
  )
}
