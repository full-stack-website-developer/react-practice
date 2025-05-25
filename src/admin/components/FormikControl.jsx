import FieldArrayControl from "./FormikFieldComponents/FieldArray";
import Input from "./FormikFieldComponents/Input";
import Select from "./FormikFieldComponents/Select";
import Textarea from "./FormikFieldComponents/Textarea";
import CheckboxGroup from "./FormikFieldComponents/CheckboxGroup";
import File from "./FormikFieldComponents/File";
import TextEditor from "./Jodit/TextEditor";
import ImagesUploader from "./imagesUploader/ImagesUploader";
import Radio from "./FormikFieldComponents/Radio";
import ColorPicker from "./FormikFieldComponents/ColorPicker";
import TagsInput from "./FormikFieldComponents/TagsInput";
import Star from "./FormikFieldComponents/Star";

function FormikControl(props) {
    const { control, ...rest } = props;
    switch (control) {
        case 'input': return <Input { ...rest } />
        case 'textarea': return <Textarea {...rest} />
        case 'select': return <Select {...rest} />
        case 'fieldArray': return <FieldArrayControl {...rest} />
        case 'checkbox': return <CheckboxGroup {...rest} />
        case 'file': return <File {...rest} />
        case 'textEditor': return <TextEditor {...rest} />
        case 'imageUploaderBox': return <ImagesUploader {...rest} />
        case 'radio': return <Radio {...rest} /> 
        case 'color': return <ColorPicker {...rest} /> 
        case 'tagsInput': return <TagsInput {...rest} /> 
        case 'star': return <Star {...rest} /> 
        default:
            return null;
    }
}

export default FormikControl;