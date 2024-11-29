"use server"

import { NextResponse } from "next/server";
import DBConnection from "../../utils/config/db";
import bookingModel from "../../utils/models/Booking";

export async function GET() {
  await DBConnection(); // Connect to the database

  try {
    const orders = await bookingModel.find(); // Fetch all orders from the 'orders' collection
    return NextResponse.json({orders}); // Return the data directly
  } catch (error) {
    console.error("Error fetching orders:", error);
    return { message: "Failed to fetch orders" }; // Return error message if there's an issue
  }
}
