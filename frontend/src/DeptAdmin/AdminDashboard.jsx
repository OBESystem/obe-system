import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from './NavAdmin';
import AdminSidebar from './AdminSidebar';
import NA from './NeedAuthentication';
import './stylesAdminDashboard.css';

function AdminDashboard() {
  const [toggle, setToggle] = useState(true);
  // const [showCourseList, setShowCourseList] = useState(false);
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [designation, setDesignation] = useState('');
  const [dept, setDept] = useState('');
  const Toggle = () =>{
    setToggle(!toggle)
  }


  useEffect(()=> {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth === 'true') {
      setAuth(true);
      axios.get('http://localhost:7000/AdminDashboard')
      .then(res => {
        if(res.data.Status === "Success")
        {
          setAuth(true);
          localStorage.setItem('auth', 'true');
          setName(res.data.name);
          setUserId(res.data.user_id);
          setDept(res.data.dept);
          setDesignation(res.data.designation);
        }
      })
    }
    else
    {
      axios.get('http://localhost:7000/AdminDashboard')
      .then(res => {
        if(res.data.Status === "Success")
        {
          setAuth(true);
          localStorage.setItem('auth', 'true');
          setName(res.data.name);
          setUserId(res.data.user_id);
          setDept(res.data.dept);
          setDesignation(res.data.designation);
        }
        else
        {
          setAuth(false);
        }
      })
    }
  }, [])

  
  const navigate = useNavigate();
  //Reloading removes the user data

  
  return (
    <div className="container-fluid cntAdminDashboard">
      {
         auth ?
          <div className="container-fluid bg-secondary min-vh-100">
            {toggle && 
            <div className="cntAdminDashboard row">
              <div className="col-2 bg-white ">
                <AdminSidebar name={name} dept={dept} designation={designation}/>
              </div>
              <div className="col-10 vh-100">
                  <div className="px-3">
                  <Nav Toggle={Toggle} name={name}/>
                  <div className="container-fluid">
                      
                      Image or something else 

                  </div>
              </div>
              </div>
            </div>}
            {!toggle && 
            <div className="cntAdminDashboard vh-100">
                <div className="px-3">
                <Nav Toggle={Toggle} name={name}/>
                <div className="container-fluid">
                    
                    Show something else
    
                </div>
            </div>
            </div>
            } 
          </div>
        :
          <div>
            <NA />
          </div>
      }
    </div>
  )
}

export default AdminDashboard;
