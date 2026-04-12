"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'

export default function AddPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    genre: '',
    rating: '',
    status: 'กำลังดู',
    image_url: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/animes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        Swal.fire({
          title: 'บันทึกสำเร็จ!',
          text: 'เพิ่มอนิเมะเรื่องใหม่เข้าลิสต์แล้ว',
          icon: 'success',
          background: '#1a1a1a',
          color: '#ffffff',
          confirmButtonColor: '#4CAF50'
        }).then(() => {
          router.push('/');
        });
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      Swal.fire({
        title: 'เกิดข้อผิดพลาด!',
        text: 'ไม่สามารถบันทึกข้อมูลได้',
        icon: 'error',
        background: '#1a1a1a',
        color: '#ffffff',
        confirmButtonColor: '#ff4d4d'
      });
    }
  }

  return (
    <div style={{ padding: '40px', backgroundColor: '#1a1a1a', minHeight: '100vh', color: 'white', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: '#fff', padding: '30px', borderRadius: '20px', color: '#333', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
        
        {/* แก้ไขส่วนหัวข้อตรงนี้ครับ */}
        <h2 style={{ 
          marginTop: 0, 
          marginBottom: '10px', // เพิ่มระยะห่างด้านล่างแทน
          color: '#4CAF50', 
          textAlign: 'center',
          textDecoration: 'none'
        }}>
          ➕ เพิ่มอนิเมะเรื่องใหม่
        </h2>
        
        {/* เส้นใต้หัวข้อ - ปรับ margin ไม่ให้เป็นค่าติดลบ */}
        <div style={{ 
          width: '60px', 
          height: '4px', 
          backgroundColor: '#4CAF50', 
          margin: '0 auto 25px auto', // เปลี่ยนจาก -10px เป็น 0 เพื่อไม่ให้มันลอยทับตัวหนังสือ
          borderRadius: '10px' 
        }}></div>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          <label style={{ fontWeight: 'bold' }}>ชื่อเรื่อง:</label>
          <input placeholder="ชื่ออนิเมะ" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required style={inputStyle} />
          
          <label style={{ fontWeight: 'bold' }}>แนว:</label>
          <input placeholder="เช่น Action, Adventure" value={form.genre} onChange={e => setForm({...form, genre: e.target.value})} style={inputStyle} />
          
          <label style={{ fontWeight: 'bold' }}>คะแนน (1-10):</label>
          <input type="number" min="1" max="10" value={form.rating} onChange={e => setForm({...form, rating: e.target.value})} style={inputStyle} />
          
          <label style={{ fontWeight: 'bold' }}>สถานะ:</label>
          <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} style={inputStyle}>
            <option value="กำลังดู">กำลังดู</option>
            <option value="ดูจบแล้ว">ดูจบแล้ว</option>
            <option value="ดองไว้ก่อน">ดองไว้ก่อน</option>
          </select>
          
          <label style={{ fontWeight: 'bold' }}>ลิงก์รูปภาพ (URL):</label>
          <input placeholder="https://..." value={form.image_url} onChange={e => setForm({...form, image_url: e.target.value})} style={inputStyle} />
          
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button type="submit" style={{ flex: 1, backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '12px', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', transition: '0.3s' }}>บันทึกข้อมูล</button>
            <button type="button" onClick={() => router.push('/')} style={{ flex: 1, backgroundColor: '#eee', color: '#333', border: 'none', padding: '12px', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold' }}>ยกเลิก</button>
          </div>
        </form>
      </div>
    </div>
  )
}

const inputStyle = { padding: '12px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '16px', outline: 'none' };