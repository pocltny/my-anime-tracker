"use client"
import React, { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Swal from 'sweetalert2'

export default function EditPage() {
  const router = useRouter();
  const { id } = useParams(); // ดึง ID จาก URL
  const [form, setForm] = useState({
    title: '',
    genre: '',
    rating: '',
    status: 'กำลังดู',
    image_url: ''
  });

  // ดึงข้อมูลเดิมจาก Database มาแสดงในฟอร์ม
  useEffect(() => {
    fetch('/api/animes')
      .then(res => res.json())
      .then(data => {
        // หาเรื่องที่มี ID ตรงกับ URL
        const target = data.find(item => item.id == id);
        if (target) {
          setForm({
            title: target.title,
            genre: target.genre,
            rating: target.rating,
            status: target.status,
            image_url: target.image_url
          });
        }
      });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/animes', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, id: id }) // ส่งข้อมูลพร้อม ID ไปอัปเดต
      });

      if (res.ok) {
        Swal.fire({
          title: 'อัปเดตเรียบร้อย!',
          text: 'ข้อมูลอนิเมะถูกแก้ไขแล้ว',
          icon: 'success',
          background: '#1a1a1a',
          color: '#ffffff',
          confirmButtonColor: '#4CAF50'
        }).then(() => {
          router.push('/'); // อัปเดตเสร็จแล้วกลับหน้าแรก
        });
      } else {
        throw new Error('Update failed');
      }
    } catch (error) {
      Swal.fire({
        title: 'ล้มเหลว!',
        text: 'แก้ไขข้อมูลไม่สำเร็จ',
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
        <h2 style={{ marginTop: 0, color: '#2196F3', textAlign: 'center' }}>📝 แก้ไขอนิเมะ</h2>
        <div style={{ width: '50px', height: '3px', backgroundColor: '#2196F3', margin: '-10px auto 20px auto' }}></div>
        
        <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          <label style={{ fontWeight: 'bold' }}>ชื่อเรื่อง:</label>
          <input 
            value={form.title} 
            onChange={e => setForm({...form, title: e.target.value})} 
            required 
            style={inputStyle} 
          />
          
          <label style={{ fontWeight: 'bold' }}>แนว:</label>
          <input 
            value={form.genre} 
            onChange={e => setForm({...form, genre: e.target.value})} 
            style={inputStyle} 
          />
          
          <label style={{ fontWeight: 'bold' }}>คะแนน (1-10):</label>
          <input 
            type="number" 
            min="1" 
            max="10" 
            value={form.rating} 
            onChange={e => setForm({...form, rating: e.target.value})} 
            style={inputStyle} 
          />
          
          <label style={{ fontWeight: 'bold' }}>สถานะ:</label>
          <select 
            value={form.status} 
            onChange={e => setForm({...form, status: e.target.value})} 
            style={inputStyle}
          >
            <option value="กำลังดู">กำลังดู</option>
            <option value="ดูจบแล้ว">ดูจบแล้ว</option>
            <option value="ดองไว้ก่อน">ดองไว้ก่อน</option>
          </select>
          
          <label style={{ fontWeight: 'bold' }}>ลิงก์รูปภาพ (URL):</label>
          <input 
            value={form.image_url} 
            onChange={e => setForm({...form, image_url: e.target.value})} 
            style={inputStyle} 
          />
          
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button type="submit" style={{ flex: 1, backgroundColor: '#2196F3', color: 'white', border: 'none', padding: '12px', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>
              อัปเดตข้อมูล
            </button>
            <button type="button" onClick={() => router.push('/')} style={{ flex: 1, backgroundColor: '#eee', color: '#333', border: 'none', padding: '12px', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold' }}>
              ยกเลิก
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const inputStyle = { padding: '12px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '16px', outline: 'none' };