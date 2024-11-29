"use client"
import React, { useEffect, useState } from "react";

const OrderCard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/orders");
        const data = await response.json();
        
        if (Array.isArray(data.orders)) {
          setOrders(data.orders);
        } else {
          console.error("Expected array but got:", data);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div style={styles.cardContainer}>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order._id} style={styles.card}>
            <h3 style={styles.cardTitle}>Order ID: {order._id}</h3> <br/>
            <h3 style={styles.cardTitle}>Email: {order.email}</h3>
            
            <p style={styles.cardText}>Title: {order.title}</p>
            <p style={styles.cardText}>Price: ${order.price}</p>
            <p style={styles.cardText}>Make: {order.make}</p>
            <p style={styles.cardText}>Model: {order.model}</p>
            <p style={styles.cardText}>Year: {order.year}</p>
            <p style={styles.cardText}>Mileage: {order.mileage}</p>
            <p style={styles.cardText}>Condition: {order.itemCondition}</p>
            <p style={styles.cardText}>Availability: {order.availability}</p>
            <p style={styles.cardText}>VIN: {order.vin}</p>
            <p style={styles.cardText}>Body Type: {order.bodyType}</p>
            <p style={styles.cardText}>Color: {order.color}</p>
            <p style={styles.cardText}>Drive Wheel Configuration: {order.driveWheelConfiguration}</p>
            <p style={styles.cardText}>Doors: {order.numberOfDoors}</p>
            <p style={styles.cardText}>Fuel Type: {order.fuelType}</p>
            <p style={styles.cardText}>Engine: {order.vehicleEngine}</p>
            <p style={styles.cardText}>Seating Capacity: {order.vehicleSeatingCapacity}</p>
            <p style={styles.cardText}>Transmission: {order.vehicleTransmission}</p>
            <p style={styles.cardText}>Cylinders: {order.cylinders}</p>
            <p style={styles.cardText}>Features: {order.carFeature?.join(", ")}</p>
            <p style={styles.cardText}>Safety Features: {order.carSafetyFeature?.join(", ")}</p>
            <p style={styles.cardText}>Description: {order.description}</p>
            {order.image && <img src={order.image} alt={order.title} style={styles.cardImage} />}
            <p style={styles.cardText}>Created At: {new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
        ))
      ) : (
        <p>No orders available</p>
      )}
    </div>
  );
};

const styles = {
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
    padding: "20px",
  },
  card: {
    width: "300px",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#f8f9fa",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "left",
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
  },
  cardText: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "8px",
  },
  cardImage: {
    width: "100%",
    height: "auto",
    borderRadius: "8px",
    marginTop: "10px",
  },
};

export default OrderCard;
