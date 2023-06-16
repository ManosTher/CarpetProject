import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
    const [users, setUsers]= useState([]);
    toast.configure();
    const {id} = useParams();

    useEffect(()=> {
        loadUsers();
        
    },[]);

    const loadUsers=async()=>{
        const result = await axios.get("http://localhost:8080/users");
        setUsers(result.data);
    };

    const deleteUser = async(id)=>{
      await axios.delete(`http://localhost:8080/user/${id}`)
      loadUsers()
      toast('Record Deleted');
    };

  return (
    <div className="container">
        <div className="py-4">
          <table className="table border shadow">
            <thead>
              <tr>
                <th scope="col">A/A</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Address</th>
                <th scope="col">Zip Code</th>
                <th scope="col">Phone Number</th>
                <th scope="col">E-mail</th>
                <th scope="col">City</th>
                <th scope="col">State</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {
                users.map((user,index)=>(
                  <tr>
                  <th scope="row" key={index}>{index+1}</th>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.address}</td>
                  <td>{user.zipCode}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.email}</td>
                  <td>{user.city.city}</td>
                  <td>{user.state.state}</td>

                  <td>
                    <Link className="btn btn-primary mx-3"
                          to={`/viewuser/${user.id}`}>
                            View
                    </Link>
                    <Link className="btn btn-outline-primary mx-3" 
                          to={`/edituser/${user.id}`}>
                            Edit
                    </Link>
                    <button className="btn btn-danger mx-3"
                            onClick={()=>deleteUser(user.id)}>
                      Delete</button>
                  </td>
                </tr>
                ))
              }
              
            </tbody>
          </table>
        </div>
    </div>
  )
}
