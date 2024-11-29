
"use server"

import { NextResponse } from "next/server";




export async function GET() {
    return NextResponse.json({mobiles:'all mobiles'});
}

export async function POST(request) {
    const {email,password}= await request.json();
    
      console.log(email,password);
    

    return NextResponse.json({success:'mobiles added successfull'});
}