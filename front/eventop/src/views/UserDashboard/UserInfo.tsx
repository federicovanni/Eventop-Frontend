"use client";

import { UserProfile, useUser } from '@auth0/nextjs-auth0/client';
import React, { useEffect, useState } from 'react';

export const UserInfo = () => {
    const { error, isLoading, user } = useUser();
    
    const [userData, setUserData] = useState<UserProfile | null>(null);
    
    useEffect(() => {
        if (user) {
            setUserData(user);
        }
    }, [user]);
   
    if (isLoading) {
        return (
            <section>
                <h1 className="text-3xl text-center font-bold text-slate-200">
                    Loading...
                </h1>
                <div className="flex flex-col gap-4 w-1/4 mx-auto">
                    {/* Placeholder for a loading state */}
                    <img src="#" alt="Loading" />
                </div>
            </section>
        );
    }
    
    if (error) {
        return <div>Error loading user data</div>;
    }
     
    return (
        <div className={`flex flex-col items-center w-full max-w-2xl mx-auto p-6`}>
      <div className="w-full bg-white rounded-lg shadow-md overflow-hidden">
        {userData && (
          <div className="p-6">
            <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <div className="relative w-24 h-24 rounded-full overflow-hidden">
              <img
                src={userData.picture || 'https://i.pinimg.com/736x/05/f9/fa/05f9fa8e055a33e9e59ca51bca27e401.jpg'}
                alt={userData.name ? `${userData.name}'s picture` : 'Usuario'}
                loading="lazy"
                className="rounded-full shadow-md"
                srcSet={`${userData.picture}?w=300 300w, ${userData.picture}?w=600 600w, ${userData.picture}?w=1200 1200w`} // Usa imágenes optimizadas para diferentes tamaños
                />
              </div>
              <div className="text-center sm:text-left space-y-2">
                <h1 className="text-2xl font-semibold text-gray-800">
                    ¡Hola, {userData.nickname || 'Usuario'}!
                </h1>
                <p className="text-sm text-gray-600">
                    {userData.email || 'No disponible'}
                </p>
             </div>
            </div>
          </div>
        )}
        
        <div className="px-6 py-3 bg-gray-50  flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <button
            onClick={() => alert("Configuración de perfil")}
            className="w-full sm:w-auto px-4 py-2 text-white bg-purple-500 font-semibold rounded-md shadow hover:bg-purple-600 focus:outline-none focus:ring-2  focus:ring-offset-2 "
          >
            Configurar perfil
          </button>
          
        </div>
      </div>
      <a
        href='api/auth/logout'
        className="mt-8 w-36 max-w-xs px-4 py-2 bg-red-500 text-white font-semibold rounded-md shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-center"
      >
        Cerrar sesión
      </a>
    </div>
    );
};
