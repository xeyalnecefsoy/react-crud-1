import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const ViewDetails = () => {
  const { studentid } = useParams(); // URL-dən gələn ID
  const [studentData, setStudentData] = useState(null); // Başlanğıc olaraq null

  useEffect(() => {
    console.log("Fetching data for student ID:", studentid);
    
    // Tələbə məlumatlarını yalnız ID ilə birbaşa çəkirik
    fetch(`http://localhost:3400/students/${studentid}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Server error: " + res.status);
        }
        return res.json(); // JSON cavabı oxuyuruq
      })
      .then((data) => {
        console.log("Returned data from API:", data); // JSON məlumatı konsola yazdırırıq
        setStudentData(data); // Tələbə məlumatını state-ə əlavə edirik
      })
      .catch((err) => console.error("Fetch error:", err.message));
  }, [studentid]);

  return (
    <div className="container">
      <h2>Tələbə Məlumatları</h2>
      {studentData ? (
        <div className="details">
          <p><strong>ID: </strong>{studentData.id}</p>
          <p><strong>Adı: </strong>{studentData.name}</p>
          <p><strong>Ünvanı: </strong>{studentData.place}</p>
          <p><strong>Mobil nömrəsi: </strong>{studentData.phone}</p>
        </div>
      ) : (
        <p>Məlumat tapılmadı və ya yüklənir...</p>
      )}
      <Link to="/" className="btn btn-back">Geri</Link>
    </div>
  );
};

export default ViewDetails;
