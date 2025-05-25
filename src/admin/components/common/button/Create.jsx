import { useTranslation } from "react-i18next"


const Create = ({isDisabled = false}) => {

    const { t } = useTranslation("common")
    const { create } = t('text')

    return (
        <button type="submit" disabled={isDisabled} className="mt-3 btn btn-success me-md-2">{ create }</button>
    )
}

export default Create