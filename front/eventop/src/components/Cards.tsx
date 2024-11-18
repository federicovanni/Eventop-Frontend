"use client";
import React, { useMemo } from "react";
import { Heart } from "lucide-react";
import { useGetAllEvents } from "@/helpers/events.helper";
import { IEvents } from "../interfaces/IEventos";
import Link from "next/link";
import Image from "next/image";

const EventCard: React.FC<{ event: IEvents }> = ({ event }) => (
  <div
    key={`event-${event.eventId}`}
    className="bg-gray-900 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
  >
    <div className="relative group">
      {event.imageUrl ? (
        <Image
          className="w-full h-56 object-cover object-center"
          src={event.imageUrl}
          alt={event.name}
          loading="lazy"
          width={500}  
          height={224}
        />
      ) : (
        <div className="w-full h-56 bg-gray-700 flex items-center justify-center text-gray-400">
          Sin imagen
        </div>
      )}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
        <Link
          href={`/events/${event.eventId}`}
          className="text-white bg-purple-600 hover:bg-purple-700 font-bold py-2 px-4 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 ease-in-out"
        >
          Ver Detalles
        </Link>
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-white text-xl font-semibold mb-2 truncate">
        {event.name}
      </h3>
      <p className="text-gray-400 mb-4">{event.date}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-purple-300 font-medium px-2 py-1 bg-purple-900 rounded-full">
          {event.category_id?.name || "Sin categoría"}
        </span>
        <button className="text-gray-400 hover:text-pink-500 transition duration-300 ease-in-out">
          <Heart className="h-6 w-6" />
        </button>
      </div>
    </div>
  </div>
);

const Cards: React.FC = () => {
  const { result, loading, error } = useGetAllEvents() as {
    result: IEvents[] | null;
    loading: boolean;
    error: string;
  };

  const renderContent = useMemo(() => {
    if (loading) return <div>Cargando eventos...</div>;
    if (error) return <div>Error al cargar los eventos</div>;

    return result?.length ? (
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {result.map((event) => (
          <EventCard key={`event-${event.eventId}`} event={event} />
        ))}
      </section>
    ) : (
      <div className="text-center text-gray-400">
        No hay eventos disponibles
      </div>
    );
  }, [result, loading, error]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 py-20 px-4 sm:px-6 lg:px-8">
      <main className="max-w-7xl mx-auto">
        <h1 className="text-xl sm:text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 text-center mb-12">
          Eventos Recientes
        </h1>
        {renderContent}
      </main>
    </div>
  );
};

export default Cards;
