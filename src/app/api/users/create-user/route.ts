// src/app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { UserService } from '@/services/user/UserService';
import { IUser } from '@/db/models/UserTable';

export async function POST(req: NextRequest) {
    const data: IUser = await req.json();

    try {
        await new UserService().createUser(data);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('User creation failed:', error);
        return NextResponse.json({ success: false, error: 'User creation failed' }, { status: 500 });
    }
}
