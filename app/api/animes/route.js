import { connection } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const [rows] = await connection.execute('SELECT * FROM animes');
        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const { title, genre, rating, status, image_url } = await request.json();
        const [result] = await connection.execute(
            'INSERT INTO animes (title, genre, rating, status, image_url) VALUES (?, ?, ?, ?, ?)',
            [title, genre, rating, status, image_url]
        );
        return NextResponse.json({ id: result.insertId, message: 'Success' });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const { id } = await request.json();
        await connection.execute('DELETE FROM animes WHERE id = ?', [id]);
        return NextResponse.json({ message: 'Deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// เพิ่มต่อท้ายในไฟล์ app/api/animes/route.js
export async function PUT(request) {
    try {
        const { id, title, genre, rating, status, image_url } = await request.json();
        await connection.execute(
            'UPDATE animes SET title = ?, genre = ?, rating = ?, status = ?, image_url = ? WHERE id = ?',
            [title, genre, rating, status, image_url, id]
        );
        return NextResponse.json({ message: 'Updated successfully' });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}