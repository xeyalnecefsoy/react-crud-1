import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const StudentTable = () => {

  const [students, setStudents] = useState([]); // Başlanğıcda boş massiv
  const navigate = useNavigate();

  const DisplayDetails = (id) => {
    navigate("/student/view/" + id);
  }

  const EditDetails = (id) => {
    navigate("/student/edit/" + id);
  }

  const RemoveDetails = (id) => {
    if (window.confirm("Silmək istədiyinizə əminsiniz?")) {
      fetch(`http://localhost:3400/students/` + id, {
        method: 'DELETE',
      }).then((res) => {
        alert("Tələbə Məlumatı Uğurla Silindi");

        // Silmə əməliyyatı bitdikdən sonra state yenilənir
        setStudents(prevStudents => prevStudents.filter(student => student.id !== id));
      }).catch((err) => console.log(err));
    }
  }

  useEffect(() => {
    fetch('http://localhost:3400/students')
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div className='container'>
      <h2>Tələbələr</h2>
      <div className='table-container'>
        <Link to="/student/create" className="btn btn-add">Yeni tələbə əlavə et</Link>
        <table>
          <thead>
            <tr>
              <th>S1 No</th>
              <th>Adı</th>
              <th>Ünvan</th>
              <th>Nömrə</th>
              <th>Əməliyyat</th>
            </tr>
          </thead>
          <tbody>
            {
              students && students.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.place}</td>
                  <td>{item.phone}</td>
                  <td>
                    <button onClick={() => DisplayDetails(item.id)} className='btn btn-info'>Bax</button>
                    <button onClick={() => EditDetails(item.id)} className='btn btn-primary'>Düzəliş</button>
                    <button onClick={() => RemoveDetails(item.id)} className='btn btn-danger'>Sil</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentTable;
