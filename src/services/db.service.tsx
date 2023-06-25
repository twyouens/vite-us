import mongoose from 'mongoose';
import React, { useEffect } from 'react';

const ConnectToMongo: React.FC = () => {
    const dbUri = import.meta.env.DB_URI;
    useEffect(() => {
        const connect = async () => {
        try {
            await mongoose.connect(dbUri, {});
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
        }
        };

        connect();
    }, []);

  return <div>Connecting to MongoDB...</div>;
};

export default ConnectToMongo;