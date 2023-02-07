import {useState} from "react";
import avatar from "../../Assets/images/avatar.png";
import {useDispatch} from "react-redux";
import {Notification} from "../useNotification";
import {createBrand} from "../../Redux/actions/brandAction";


const AdminAddBrandHook = _ => {
    const [image, setImage] = useState(avatar)
    const [selectedFile, setSelectedFile] = useState(null)
    const [text, settext] = useState('')
    const [loading, setloading] = useState(false)
    const dispatch = useDispatch()

    const setTextState = e =>{
        // e.persist()
        settext(e.target.value)
    }
    const onImageChange = e => {
        setImage(URL.createObjectURL(e.target.files[0]))
        setSelectedFile(e.target.files[0])
    }

    const onSubmit = async _ => {
        //post the data
        // BaseURL.post('/api/v1/categories',{name:text,image:image}, {headers: {'Content-Type':"multipart/form-data"}})
        if (image !== avatar && text !== '') {
            const formData = new FormData()
            formData.append('name', text)
            formData.append('image', selectedFile)
            settext('')
            setImage(avatar)
            setSelectedFile(null)
            setloading(true)
            await dispatch(createBrand(formData))
            setloading(false)
        } else {
            Notification('Enter a valid Data!!!', 'warning')
        }
    }

    return [image,text,loading,setTextState,onImageChange,onSubmit]
}

export default AdminAddBrandHook