import React, { useContext, useRef } from 'react';
import BasicButton from '../../../../../tools/buttons/BasicButton';
import TextField from '../../../../../tools/inputs/TextField';
import { AuthContext } from '../../../../../contexts/AuthProvider';
import useGetDBUser from '../../../../../hooks/useGetDBUser';

const EditProfileModal = ({editingUser,dbUserRefetch,setEditingUser}) => {

   
    const modelToggle = useRef()


    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const userName = form.userName.value;
        const address = form.address.value
        const contactNo = form.contactNo.value

        const updatingProfileInfo = {
            userName,
            address,
            contactNo
        }

        console.log(updatingProfileInfo)
        fetch(`${process.env.REACT_APP_serverSiteLink}edit-profile?email=${editingUser?.email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatingProfileInfo)
        }).then(res => res.json()).then(data => {
            console.log(data)
            if (data?.acknowledged) {
                setEditingUser(null)
                dbUserRefetch()
                form.reset()
                modelToggle.current.click()
            }
        })

    }


    return (
        <div>
            <input ref={modelToggle} type="checkbox" id="editProfileModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <form
                        onSubmit={handleSubmit}
                        className="card-body lg:w-[80%] w-[90%] border-2 border-solid border-gray-200 rounded-lg my-5 mx-auto"
                    >
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">User Name</span>
                            </label>
                            <TextField
                                defaultValue={editingUser?.userName}
                                type="text"
                                name="userName"
                                placeholder="User Name"
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Address</span>
                            </label>
                            <TextField
                                defaultValue={editingUser?.address || ''}
                                type="text"
                                placeholder="Address"
                                name={"address"}
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Contact Number</span>
                            </label>
                            <TextField
                                defaultValue={editingUser?.contactNo || ''}
                                type="text"
                                placeholder="Contact Number"
                                name={"contactNo"}
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control mt-6">
                            <BasicButton type={"submit"}>Save</BasicButton>
                        </div>
                    </form>
                </div>
                <label className="modal-backdrop" htmlFor="editProfileModal">Close</label>
            </div>
        </div>
    );
};

export default EditProfileModal;