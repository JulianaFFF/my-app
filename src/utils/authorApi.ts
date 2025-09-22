import { Autor } from '../types/tipos';

export const getAutores = async (): Promise<Autor[]> => {
  try {
    const response = await fetch('http://127.0.0.1:8080/api/authors');
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener autores:', error);
    throw new Error('No se pudieron cargar los autores desde el servidor');
  }
};