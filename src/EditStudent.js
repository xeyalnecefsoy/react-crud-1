import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';



const EditStudent = () => {

  const { studentid } = useParams(); // URL-dən gələn ID
  // const [studentData, setStudentData] = useState(null); // Başlanğıc olaraq null

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [phone, setPhone] = useState("");
  const [validation, setValidation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Fetching data for student ID:", studentid);
  
    fetch(`http://localhost:3400/students/`+studentid)
  .then((res) => {
    if (!res.ok) {
      throw new Error("Server error: " + res.status);
    }
    return res.json();
  })
  .then((data) => {
    setId(data.id);
    setName(data.name);
    setPlace(data.place);
    setPhone(data.phone);
  })
  .catch((err) => console.error("Fetch error:", err.message));

  }, [studentid]);

  const handleSubmit=(e)=>{
    e.preventDefault();
    // Add new student to the database here
    const studentData = {id, name, place, phone};

    fetch(`http://localhost:3400/students/`+studentid, {
      method: 'PUT',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(studentData)
    }).then((res)=>{
      alert("Tələbə Məlumatında düzəliş edildi")
      navigate("/")
    }).catch((err)=>console.log(err)
    )
  }


  return (
    <div className='container'>
    <h2>Tələbə Məlumatlarına Düzəliş et</h2>
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
        <button className='btn btn-save'>Düzəliş</button>
        <Link to="/" className='btn btn-back'>Geri</Link>
      </div>
    </form>
  </div>
  )
}

export default EditStudent