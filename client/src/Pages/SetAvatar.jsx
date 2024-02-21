import axios from 'axios'
import React from 'react'
import uploadArea from '../Assets/uploadArea.png.jpg'
import { useEffect, useState } from 'react'
import Loader from '../Utils/Loader'
import './SetAvatar.css'
import { useNavigate } from 'react-router-dom';
import { ApisetAvatar } from '../Utils/ApiRoutes'

const SetAvatar = () => {

    const navigate = useNavigate();
    const [image, setImage] = useState(false)

    useEffect(() => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user) {
                navigate('/login')
            }
    }, []);

    const changeHandler = (e) => {
        setImage(e.target.files[0])
    }

    const submitHandler = async (e) => {
        if (!image) {
            alert('Please select an image')
            return;
        }
        e.preventDefault()
        const formdata = new FormData()
        formdata.append('file', image);
        formdata.append('upload_preset', `${process.env.REACT_APP_UPLOAD_PRESET}`);
        formdata.append('cloud_name', `${process.env.REACT_APP_CLOUD_NAME}`);

        const { secure_url, public_id } = await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`, {
            method: 'POST',
            body: formdata
        }).then((res) => res.json());

        const user = JSON.parse(localStorage.getItem('user'))

        if (secure_url && public_id) {
            try {
                const res = await axios.post(`${ApisetAvatar}/${user._id}`, {

                    secure_url,
                    public_id
                });
                localStorage.setItem('user', JSON.stringify(res.data.user));
                navigate('/')
            }
            catch (err) {
                console.log(err)

            }

        }


    }


    return (
        <div className='setavatar'>
            <div><h1>Upload an Image for your profile picture</h1></div>
            <div className='avatar'>
                <form onSubmit={submitHandler}>

                    <label htmlFor="avatar"><img src={image ? URL.createObjectURL(image) : uploadArea} name="avatar" id="upload" /></label>

                    <input type="file" name="avatar" id="avatar" onChange={changeHandler} hidden />
                    <input type="submit" value="Upload" name="submit" className='submitbtn' />
                </form>
            </div>

        </div>
    )
}

export default SetAvatar
