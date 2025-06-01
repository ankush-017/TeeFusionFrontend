import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../API.js'

function Contact() {

  const navigate = useNavigate();

  useEffect(()=>{
    API.get('/contact')
    .then(()=> console.log("Contact Page"))
    .catch((err)=>{
      navigate('/login');
    })
  },[navigate]);

  return (
    <div className='min-h-[80vh] flex justify-center items-center'>
      Contact
    </div>
  )
}
export default Contact;