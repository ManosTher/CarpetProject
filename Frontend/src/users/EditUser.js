import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditUser() {

    toast.configure();
    let navigate = useNavigate();
    const {id}= useParams()

    const [user,setUser] = useState({
        firstName:" ",
        lastName:" ",
        address:" ",
        zipCode:" ",
        phoneNumber:" ",
        email:" ",
        city: " ",
        state: " "
    });
    const{firstName,lastName,address,zipCode,phoneNumber,email, city, state}=user;
    // function which add the values to user Object
    const onInputChange=(e)=>{
        setUser({...user,[e.target.name]: e.target.value});
    };

    const onCityChange = (e) => {
        let city = {city : e.target.value};
        setUser({...user, [e.target.name]: city.city});
    }

    const onStateChange = (e) => {
        let state = {state : e.target.value};
        setUser({...user, [e.target.name]: state.state});
    }

    useEffect(()=>{
        loadUser()
    },[]);

    const onSubmit = async (e)=>{
        e.preventDefault();
        try {
            let userToEdit = user;
            if(typeof userToEdit.city === 'object' && userToEdit.city !== null){
                userToEdit.city = user.city.city;
            }
            if(typeof userToEdit.state === 'object' && userToEdit.state !== null){
                userToEdit.state = user.state.state;
            }
            await axios.put(`http://localhost:8080/user/${id}`,userToEdit)
            navigate("/")
            toast('Record Updated');
        } catch(e) {
            toast(e);
        }
        

    };

    const loadUser=async () => {
        const result=await axios.get(`http://localhost:8080/user/${id}`)
        setUser(result.data)
    };

  return (
    <div className="container">
        <div className="row">
            <div className="col-md-6 offset-md-3 border p-4 mt-2 shadow">
                <h2 className="text-center m-4">Edit User</h2>
                <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                        First Name
                    </label>
                    <input
                    type={"text"}
                    className="form-control"
                    placeholder="Enter your first name"
                    name="firstName"
                    value={firstName}
                    onChange={(e)=>onInputChange(e)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">
                        Last Name
                    </label>
                    <input
                    type={"text"}
                    className="form-control"
                    placeholder="Enter your last name"
                    name="lastName"
                    value={lastName}
                    onChange={(e)=>onInputChange(e)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                        Address
                    </label>
                    <input
                    type={"text"}
                    className="form-control"
                    placeholder="Enter your Address"
                    name="address"
                    value={address}
                    onChange={(e)=>onInputChange(e)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="zipCode" className="form-label">
                        Zip-Code
                    </label>
                    <input
                    type={"number"}
                    className="form-control"
                    placeholder="Enter your zip code"
                    name="zipCode"
                    value={zipCode}
                    onChange={(e)=>onInputChange(e)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label">
                        Phone Number
                    </label>
                    <input
                    type={"number"}
                    className="form-control"
                    placeholder="Enter your phone number"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={(e)=>onInputChange(e)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        E-mail
                    </label>
                    <input
                    type={"email"}
                    className="form-control"
                    placeholder="Enter your e-mail"
                    name="email"
                    value={email}
                    onChange={(e)=>onInputChange(e)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="city" className="form-label">
                        City
                    </label>
                    <input
                    type={"text"}
                    className="form-control"
                    placeholder="Enter your city"
                    name="city"
                    value={city.city}
                    onChange={(e)=>onCityChange(e)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="state" className="form-label">
                        State
                    </label>
                    <input
                    type={"text"}
                    className="form-control"
                    placeholder="Enter your State"
                    name="state"
                    value={state.state}
                    onChange={(e)=>onStateChange(e)}/>
                </div>
                <button type="submit" className="btn btn-outline-primary">
                    Submit
                </button>
                <Link className="btn btn-outline-danger mx-2" to="/">
                    Cancel
                </Link>
                </form>
            </div>
        </div>

    </div>
  )
}
