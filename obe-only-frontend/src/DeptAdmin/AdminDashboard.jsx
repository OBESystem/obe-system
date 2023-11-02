import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from './NavAdmin';
import AdminSidebar from './AdminSidebar';
import NA from './NeedAuthentication';
import './stylesAdminDashboard.css';

function AdminDashboard() {
  const [toggle, setToggle] = useState(true);
  const [showCourseList, setShowCourseList] = useState(false);
  const [auth, setAuth] = useState(true);
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [dept, setDept] = useState('');
  const Toggle = () =>{
    setToggle(!toggle)
  }

//   useEffect(()=> {
//     const storedAuth = localStorage.getItem('auth');
//     if (storedAuth === 'true') {
//       setAuth(true);
//       axios.get('http://localhost:7000/TeacherDashboard')
//       .then(res => {
//         if(res.data.Status === "Success")
//         {
//           setAuth(true);
//           localStorage.setItem('auth', 'true');
//           setName(res.data.name);
//           setId(res.data.id);
//           setDept(res.data.dept);
//         }
//       })
//     }
//     else
//     {
//       axios.get('http://localhost:7000/TeacherDashboard')
//       .then(res => {
//         if(res.data.Status === "Success")
//         {
//           setAuth(true);
//           localStorage.setItem('auth', 'true');
//           setName(res.data.name);
//           setId(res.data.id);
//           setDept(res.data.dept);
//         }
//         else
//         {
//           setAuth(false);
//         }
//       })
//     }
// }, [])

  const [info, setInfo] = useState([]);

  // const GetInfo=(event) => {
  //   axios.get('http://localhost:7000/TeacherInfo', { params: { id: id } })
  //   .then(res =>{
  //     setInfo(res.data);
  //     //console.log("Info of "+ id);
  //     //console.log(res.data);
  //   })
  //   .catch(err => console.log(err));
  // }
  const navigate = useNavigate();
  //Reloading removes the user data

  const EnterCF=(index) => {
    navigate('/Enter-Course-File', { state: { courseData: info[index] } });
  }
  return (
    <div className="container-fluid cnt">
      {
         auth ?
          <div className="container-fluid bg-secondary min-vh-100">
            {toggle && 
            <div className="cnt row">
              <div className="col-2 bg-white ">
                <AdminSidebar name={name} dept={dept}/>
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
            <div className="cnt vh-100">
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
