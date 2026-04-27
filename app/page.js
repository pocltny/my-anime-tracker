"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Swal from 'sweetalert2'

export default function Page() {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ทั้งหมด');
  const [hoveredId, setHoveredId] = useState(null);

  const fetchAnimes = async () => {
    try {
      const res = await fetch('/api/animes');
      const data = await res.json();
      setAnimes(data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchAnimes(); }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'ยืนยันการลบ?',
      text: "คุณจะไม่สามารถกู้คืนข้อมูลอนิเมะเรื่องนี้ได้!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff4d4d',
      cancelButtonColor: '#333',
      confirmButtonText: 'ใช่, ลบเลย!',
      cancelButtonText: 'ยกเลิก',
      background: '#1a1a1a',
      color: '#ffffff'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await fetch('/api/animes', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
          });
          
          Swal.fire({
            title: 'ลบเรียบร้อย!',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
            background: '#1a1a1a',
            color: '#ffffff'
          });

          fetchAnimes();
        } catch (error) {
          Swal.fire({
            title: 'เกิดข้อผิดพลาด!',
            text: 'ไม่สามารถลบข้อมูลได้',
            icon: 'error',
            background: '#1a1a1a',
            color: '#ffffff'
          });
        }
      }
    })
  }

  const filteredAnimes = animes.filter((item) => {
    const matchSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'ทั้งหมด' || 
                        item.status === filterStatus || 
                        (filterStatus === 'ดูจบแล้ว' && item.status === 'Completed') || 
                        (filterStatus === 'กำลังดู' && item.status === 'Watching');
    return matchSearch && matchStatus;
  });

  return (
    <div style={{ padding: '60px', backgroundColor: '#1a1a1a', minHeight: '100vh', color: 'white', fontFamily: 'Arial, sans-serif' }}>
      

      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#4CAF50', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '36px', marginBottom: '10px' }}>My Anime Tracker</h1>
        <div style={{ width: '100px', height: '4px', backgroundColor: '#4CAF50', margin: '0 auto' }}></div>
      </header>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '30px' }}>
        <Link href="/add"><button style={btnNavStyle}>+ เพิ่มอนิเมะใหม่</button></Link>
        <Link href="/about"><button style={{ ...btnNavStyle, backgroundColor: '#333', color: '#ffc107', border: '1px solid #ffc107' }}>👨‍💻 ข้อมูลผู้จัดทำ</button></Link>
      </div>

      <div style={dashboardStyle}>
        <span style={{ borderRight: '1px solid #444', paddingRight: '15px' }}>📊 ทั้งหมด: <b>{animes.length}</b></span>
        <span>✅ ดูจบแล้ว: <b style={{color: '#4CAF50'}}>{animes.filter(a => a.status === 'ดูจบแล้ว' || a.status === 'Completed').length}</b></span>
        <span>🍿 กำลังดู: <b style={{color: '#ffc107'}}>{animes.filter(a => a.status === 'กำลังดู' || a.status === 'Watching').length}</b></span>
        <span>📦 ดองไว้ก่อน: <b style={{color: '#2196F3'}}>{animes.filter(a => a.status === 'ดองไว้ก่อน').length}</b></span>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <input 
          type="text" 
          placeholder="🔍 ค้นชื่ออนิเมะของคุณ..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          style={searchInputStyle} 
        />
        
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {['ทั้งหมด', 'ดูจบแล้ว', 'กำลังดู', 'ดองไว้ก่อน'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              style={{
                ...filterBtnStyle,
                backgroundColor: filterStatus === status ? '#4CAF50' : '#333',
                color: filterStatus === status ? 'white' : '#aaa',
                border: filterStatus === status ? 'none' : '1px solid #444'
              }}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', color: '#aaa' }}>กำลังดึงข้อมูลจาก Database...</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center' }}>
          {filteredAnimes.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: '50px', backgroundColor: '#222', padding: '40px', borderRadius: '30px', width: '100%', maxWidth: '500px' }}>
              <div style={{ fontSize: '50px', marginBottom: '20px' }}>🔍</div>
              <h2 style={{ color: '#4CAF50', marginBottom: '10px' }}>ไม่พบข้อมูลอนิเมะ</h2>
              <p style={{ color: '#888' }}>ลองเปลี่ยนคำค้นหา หรือเลือกตัวกรองสถานะอื่นดูนะครับ</p>
              <button 
                onClick={() => {setSearchTerm(''); setFilterStatus('ทั้งหมด');}}
                style={{ marginTop: '20px', padding: '8px 20px', backgroundColor: 'transparent', color: '#4CAF50', border: '1px solid #4CAF50', borderRadius: '20px', cursor: 'pointer' }}
              >
                ล้างการค้นหาทั้งหมด
              </button>
            </div>
          ) : (
            filteredAnimes.map((item) => (
              <div 
                key={item.id} 
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{ 
                  ...cardStyle,
                  transform: hoveredId === item.id ? 'translateY(-15px)' : 'translateY(0)',
                  boxShadow: hoveredId === item.id ? '0 15px 30px rgba(76, 175, 80, 0.4)' : '0 8px 16px rgba(0,0,0,0.5)'
                }}
              >
                <img 
                  src={item.image_url || 'https://via.placeholder.com/250x350'} 
                  style={imgStyle} 
                  alt={item.title} 
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/250x350?text=No+Image'; }} 
                />
                <h3 style={titleStyle}>{item.title}</h3>
                <p style={{ margin: '5px 0', color: '#666', fontSize: '13px' }}>แนว: {item.genre}</p>
                <p style={{ fontWeight: 'bold', color: '#ff9800', margin: '5px 0' }}>⭐ {item.rating}/10</p>
                <div style={{ marginBottom: '15px' }}>
                  <span style={statusBadgeStyle}>{item.status}</span>
                </div>
                <div style={{ flexGrow: 1 }}></div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Link href={`/edit/${item.id}`} style={{ flex: 1 }}><button style={btnEditStyle}>แก้ไข</button></Link>
                  <button onClick={() => handleDelete(item.id)} style={btnDeleteStyle}>ลบ</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

const btnNavStyle = { padding: '12px 24px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold' };
const dashboardStyle = { display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '40px', fontSize: '14px', color: '#aaa', backgroundColor: 'rgba(255,255,255,0.05)', padding: '15px 25px', borderRadius: '15px', maxWidth: '650px', marginLeft: 'auto', marginRight: 'auto', flexWrap: 'wrap' };
const searchInputStyle = { padding: '12px 25px', width: '100%', maxWidth: '400px', borderRadius: '30px', border: '2px solid #4CAF50', backgroundColor: '#2a2a2a', color: 'white', outline: 'none' };
const filterBtnStyle = { padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', transition: '0.3s' };
const cardStyle = { backgroundColor: '#fff', padding: '20px', borderRadius: '20px', width: '250px', color: '#333', display: 'flex', flexDirection: 'column', minHeight: '620px', transition: 'all 0.3s ease' };
const imgStyle = { width: '100%', height: '350px', objectFit: 'cover', borderRadius: '15px', marginBottom: '15px' };
const titleStyle = { margin: '0 0 10px 0', fontSize: '18px', height: '3.6em', lineHeight: '1.2em', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical', textOverflow: 'ellipsis' };
const statusBadgeStyle = { display: 'inline-block', backgroundColor: '#e0f7fa', padding: '4px 10px', borderRadius: '10px', fontSize: '11px', color: '#006064', fontWeight: 'bold' };
const btnEditStyle = { width: '100%', backgroundColor: '#ffc107', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' };
const btnDeleteStyle = { flex: 1, backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' };