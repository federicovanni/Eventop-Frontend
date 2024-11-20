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
          src={
            event.imageUrl ||
            "data:image/png;base64,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"
          }
          alt={event.name}
          loading="lazy"
          width={500}
          height={224}
        />
      ) : (
        <div className="w-full h-56 bg-gray-700 flex items-center justify-center text-gray-400">Sin imagen</div>
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
      <h3 className="text-white text-xl font-semibold mb-2 truncate">{event.name}</h3>
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
      <div className="text-center text-gray-400">No hay eventos disponibles</div>
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
