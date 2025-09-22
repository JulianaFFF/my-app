"use client";
import { useState, useEffect } from 'react';
import { Autor } from '../../types/tipos';
import { getAutores } from '../../utils/authorApi';

export default function AutorPage() {
    // Estados para manejar el ciclo de vida de los datos
    const [autores, setAutores] = useState<Autor[]>([]);     
    const [isLoading, setIsLoading] = useState(true);       
    const [error, setError] = useState<string | null>(null);

    // useEffect para cargar datos UNA VEZ cuando el componente se monta
    useEffect(() => {
        const loadAutores = async () => {
            try {
                console.log('Cargando autores...');
                const data = await getAutores();
                console.log('Autores cargados:', data);
                setAutores(data);
            } catch (err) {
                console.error('Error:', err);
                setError('No se pudieron cargar los autores. Verifique que el backend esté funcionando.');
            } finally {
                setIsLoading(false);
            }
        };

        loadAutores();
    }, []);

    // Función para manejar edición
    const handleEdit = (id: number) => {
        console.log('Editar autor con ID:', id);
        // Por ahora solo mostramos el ID, después implementaremos la navegación
        alert(`Próximamente: Editar autor ${id}`);
    };

    // Función para manejar eliminación
    const handleDelete = async (id: number) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este autor?')) {
            try {
                console.log('Eliminando autor con ID:', id);
                // Por ahora solo mostramos el ID, después implementaremos la llamada API
                alert(`Próximamente: Eliminar autor ${id}`);
            } catch (error) {
                console.error('Error al eliminar autor:', error);
                alert('Error al eliminar el autor');
            }
        }
    };

    if (isLoading) {
        return (
            <main className="container mx-auto p-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">Lista de Autores</h1>
                    <p className="text-lg">Cargando autores desde la base de datos...</p>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="container mx-auto p-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">Lista de Autores</h1>
                    <div className="text-red-500 mb-4">{error}</div>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Reintentar
                    </button>
                </div>
            </main>
        );
    }

        return (
        <main className="container mx-auto p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Lista de Autores</h1>
                <span className="text-sm text-gray-500">
                    {autores.length} autor{autores.length !== 1 ? 'es' : ''} encontrado{autores.length !== 1 ? 's' : ''}
                </span>
            </div>

            {autores.length === 0 ? (
                <div className="text-center p-8 text-gray-500">
                    No hay autores registrados en la base de datos.
                </div>
            ) : (
                <div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    
                {autores.map((autor) => (
                            <div 
                            key={autor.id} 
                            className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white mb-4"
                            >
                            <h2 className="text-xl font-semibold mb-2 text-gray-900">
                                {autor.name}
                            </h2>
                            <p className="text-gray-700 text-sm mb-3">
                                {autor.description}
                            </p>
                            <p className="text-xs text-gray-500 mb-2">
                                Nacimiento: {new Date(autor.birthDate).toLocaleDateString()}
                            </p>
                            {autor.books && autor.books.length > 0 && (
                                <p className="text-xs text-blue-600">
                                    {autor.books.length} libro{autor.books.length !== 1 ? 's' : ''} publicado{autor.books.length !== 1 ? 's' : ''}
                                </p>
                            )}
                            
                            {/* Botones de acción */}
                            <div className="flex gap-2 mt-4 pt-3 border-t border-gray-200">
                                <button 
                                    onClick={() => handleEdit(autor.id!)}
                                    className="flex-1 bg-blue-200 text-gray-800 p-4 shadow md:px-3 py-2 rounded text-sm hover:bg-blue-600 transition-colors"
                                >
                                    Editar
                                </button>
                                <button 
                                    onClick={() => handleDelete(autor.id!)}
                                    className="flex-1 bg-blue-300 text-gray-800 p-4 shadow md:px-3 py-2 rounded text-sm hover:bg-blue-600 transition-colors"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                        
                    ))}
                </div>
            )}
        </main>
    );
}