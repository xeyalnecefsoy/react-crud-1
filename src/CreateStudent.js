import React, { useState } from 'react'

import { Link, useNavigate } from "react-router-dom"

const CreateStudent = () => {

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [phone, setPhone] = useState("");
  const [validation, setValidation] = useState(false);
  const navigate = useNavigate();

  const handleSubmit=(e)=>{
    e.preventDefault();
    // Add new student to the database here
    const studentData = {id, name, place, phone};

    fetch("http://localhost:3400/students",{
      method: 'POST',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(studentData)
    }).then((res)=>{
      alert("Tələbə Məlumatı uğurla yadda saxlanıldı")
      navigate("/")
    }).catch((err)=>console.log(err)
    )
  }

  return (
    <div className='container'>
      <h2>Yeni Tələbə Əlavə et</h2>
      <form onSubmit={handleSubmit}>

        <label htmlFor="id">ID:</label>
        <input type="text" id="id" name="id" value={id} required onChange={e=>setId(e.target.value)} onMouseDown={()=>setValidation(true)}/>
        {id.length===0 && validation && <span className='errorMsg'>ID-nizi daxil edin</span>}

        <label htmlFor="name">Adı:</label>
        <input type="text" id="name" name="name" required value={name} onChange={e=>setName(e.target.value)} onMouseDown={()=>setValidation(true)}/>
        {name.length===0 && validation && <span className='errorMsg'>Adınızı daxil edin</span>}
        
        <label htmlFor="place">Ünvan:</label>
        <input type="text" id="place" name="place" required value={place} onChange={e=>setPlace(e.target.value)} onMouseDown={()=>setValidation(true)}/>
        {place.length===0 && validation && <span className='errorMsg'>Ünvanınızı daxil edin</span>}


        <label htmlFor="phone">Nömrə:</label>
        <input type="text" id="phone" name="phone" required value={phone} onChange={e=>setPhone(e.target.value)} onMouseDown={()=>setValidation(true)}/>
        {phone.length===0 && validation && <span className='errorMsg'>Mobil nömrənizi daxil edin</span>}


        <div className='form-buttons'>
          <button className='btn btn-save'>Yadda saxla</button>
          <Link to="/" className='btn btn-back'>Back</Link>
        </div>
      </form>
    </div>
  )
}

export default CreateStudent