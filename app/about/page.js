"use client"
import React from 'react'
import { useRouter } from 'next/navigation'

export default function AboutPage() {
  const router = useRouter();

  return (
    <div style={{ padding: '60px', backgroundColor: '#1a1a1a', minHeight: '100vh', color: 'white', fontFamily: 'Arial, sans-serif' }}>
      
      <header style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ color: '#ffc107', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '32px' }}>
          ผู้จัดทำระบบ
        </h1>
        <div style={{ width: '80px', height: '3px', backgroundColor: '#ffc107', margin: '15px auto' }}></div>
      </header>

      {/* Container สำหรับการ์ด 2 คน */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap', maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* คนที่ 1: ตัวคุณ */}
        <div style={cardStyle}>
          <div style={{...avatarStyle, backgroundColor: '#4CAF50'}}>T</div>
          <h2 style={{ color: '#4CAF50', marginBottom: '10px' }}>ธีภพ ยศนวน</h2>
          <p style={{ fontSize: '18px', fontWeight: 'bold' }}>รหัสนักศึกษา: 6706319</p>
        </div>

        {/* คนที่ 2: เพิ่มข้อมูลเพื่อนตรงนี้ */}
        <div style={cardStyle}>
          <div style={{...avatarStyle, backgroundColor: '#2196F3'}}>P</div>
          <h2 style={{ color: '#2196F3', marginBottom: '10px' }}>ปัณณธร ขนบดี</h2>
          <p style={{ fontSize: '18px', fontWeight: 'bold' }}>รหัสนักศึกษา: 6706281</p>
        </div>

      </div>

      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <button 
          onClick={() => router.push('/')} 
          style={{ padding: '12px 30px', backgroundColor: '#444', color: 'white', border: 'none', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold', transition: '0.3s' }}
        >
          ← กลับหน้าแรก
        </button>
      </div>
    </div>
  )
}

// สไตล์สำหรับการ์ด
const cardStyle = {
  backgroundColor: '#fff',
  padding: '40px',
  borderRadius: '20px',
  color: '#333',
  width: '300px',
  textAlign: 'center',
  boxShadow: '0 10px 20px rgba(0,0,0,0.5)'
}

// สไตล์สำหรับรูปวงกลมตัวอักษร
const avatarStyle = {
  width: '100px',
  height: '100px',
  borderRadius: '50%',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '40px',
  margin: '0 auto 20px auto',
  fontWeight: 'bold'
}