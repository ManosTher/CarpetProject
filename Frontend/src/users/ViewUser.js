import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

export default function ViewUser() {

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        address: "",
        zipCode: "",
        phoneNumber: "",
        email: "",
        city: {city: ""},
        state: {State: ""}
    });

    const { id } = useParams();

    useEffect(()=>{
        loadUser();

    },[]);

    const loadUser=async ()=>{
        const result=await axios.get(`http://localhost:8080/user/${id}`);
        setUser(result.data);
    };

  return (
    <div className="container">
        <div className="row">
            <div className="col-md-6 offset-md-3 border p-4 mt-2 shadow">
                <h2 className="text-center m-4">User Details</h2>

                <div className="card">
                    <div className="card-header">
                        Details of user with the id : {user.id}
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <b>First Name: </b>
                                {user.firstName}

                            </li>
                            <li className="list-group-item">
                                <b>Last Name:</b>
                                {user.lastName}

                            </li>
                            <li className="list-group-item">
                                <b>Address: </b>
                                {user.address}

                            </li>
                            <li className="list-group-item">
                                <b>Zip Code: </b>
                                {user.zipCode}

                            </li>
                            <li className="list-group-item">
                                <b>Phone Number: </b>
                                {user.phoneNumber}

                            </li>
                            <li className="list-group-item">
                                <b>Email: </b>
                                {user.email}
                            </li>
                            <li className="list-group-item">
                                <b>City: </b>
                                {user.city.city}
                            </li>
                            <li className="list-group-item">
                                <b>State: </b>
                                {user.state.state}
                            </li>
                            
                        </ul>

                    </div>

                </div>
                <Link className="btn btn-primary my-2" to={"/"}>Home</Link>
            </div>
        </div>
    </div>

  );
}
