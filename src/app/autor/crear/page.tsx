"use client";
import { useState } from 'react';
import { Autor } from '../../../types/tipos';

export default function CrearAutorPage() {
    // Estados para manejar cada campo del formulario (según los requisitos)
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [image, setImage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    // Función para manejar el envío del formulario
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');

        try {
            // Crear el objeto autor sin ID (el backend lo asignará)
            const nuevoAutor: Omit<Autor, 'id'> = {
                name,
                description,
                birthDate,
                image
            };

            // Enviar al backend
            const response = await fetch('http://127.0.0.1:8080/api/authors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoAutor),
            });

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            const autorCreado = await response.json();
            console.log('Autor creado:', autorCreado);

            // Limpiar el formulario
            setName('');
            setDescription('');
            setBirthDate('');
            setImage('');
            
            setMessage('¡Autor creado exitosamente!');
        } catch (error) {
            console.error('Error al crear autor:', error);
            setMessage('Error al crear el autor. Verifique que el backend esté funcionando.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Crear Nuevo Autor</h1>
            
            {message && (
                <div className={`mb-4 p-3 rounded ${
                    message.includes('Error') 
                        ? 'bg-red-100 text-red-700 border border-red-300' 
                        : 'bg-green-100 text-green-700 border border-green-300'
                }`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
                {/* Campo Nombre */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre del Autor
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Ejemplo: Gabriel García Márquez"
                    />
                </div>

                {/* Campo Descripción */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                        Descripción
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        rows={4}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Describe al autor, su estilo literario, obras principales..."
                    />
                </div>

                {/* Campo Fecha de Nacimiento */}
                <div>
                    <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-2">
                        Fecha de Nacimiento
                    </label>
                    <input
                        id="birthDate"
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Campo Imagen */}
                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                        URL de la Imagen
                    </label>
                    <input
                        id="image"
                        type="url"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://ejemplo.com/imagen-del-autor.jpg"
                    />
                </div>

                {/* Botón de Envío */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                >
                    {isSubmitting ? "Creando..." : "Crear Autor"}
                </button>
            </form>
        </main>
    );
}