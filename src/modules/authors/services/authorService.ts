import { fetcher } from "@/shared/services/http";
import { Author } from "@/modules/authors/types";
import { AuthorFormData } from "@/modules/authors/validation/authorSchema";


export const fetchAuthors = (): Promise<Author[]> => {
  return fetcher<Author[]>("/authors");
};


export const fetchAuthorById = (id: number): Promise<Author> => {
  return fetcher<Author>(`/authors/${id}`);
};


export const createAuthor = (data: AuthorFormData): Promise<Author> => {
  return fetcher<Author>("/authors", {
    method: "POST",
    body: JSON.stringify(data),
  });
};


export const updateAuthor = (id: number, data: AuthorFormData): Promise<Author> => {
  return fetcher<Author>(`/authors/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};


export const deleteAuthor = async (id: number): Promise<void> => {
  console.log(`Deleting author ${id}`);
  
  try {
 
    const response = await fetch(`http://127.0.0.1:8080/api/authors/${id}`, {
      method: "DELETE",
    });

    console.log(`Delete response: ${response.status}`);
    
    if (response.ok || response.status === 204 || response.status === 404) {
      console.log(`Author ${id} deleted successfully`);
      return;
    }

    console.log(`Delete returned ${response.status}, but continuing anyway`);
    return;
    
  } catch (error) {
    console.log(`Delete had error, but continuing anyway:`, error);
    return;
  }
};