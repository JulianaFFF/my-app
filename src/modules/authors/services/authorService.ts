import { fetcher } from "@/shared/services/http";
import { Author } from "@/modules/authors/types";
import { AuthorFormData } from "@/modules/authors/validation/authorSchema";
import { createBook, associateBookToAuthor } from "@/modules/books/services/bookService";
import { createPrize, associatePrizeToAuthor } from "@/modules/prizes/services/prizeService";

export const fetchAuthors = (): Promise<Author[]> => {
  return fetcher<Author[]>("/authors");
};

export const fetchAuthorById = (id: number): Promise<Author> => {
  return fetcher<Author>(`/authors/${id}`);
};

export const createAuthor = async (data: AuthorFormData): Promise<Author> => {
  try {
    const authorData = {
      name: data.name,
      description: data.description,
      birthDate: data.birthDate,
      image: data.image,
    };

    const author = await fetcher<Author>("/authors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authorData),
    });

    if (!author.id) {
      throw new Error("No se pudo crear el autor");
    }

    const bookData = {
      name: data.book.name,
      isbn: data.book.isbn,
      image: data.book.image,
      publishingDate: data.book.publishingDate,
      description: data.book.description,
    };

    const book = await createBook(bookData);

    if (!book.id) {
      throw new Error("No se pudo crear el libro");
    }

    await associateBookToAuthor(author.id, book.id);

    
    const prizeData = {
      premiationDate: data.prize.premiationDate,
      name: data.prize.name,
      description: data.prize.description,
      organization: {
        id: data.prize.organizationId,
        name: "Organización", 
        tipo: "Premio",
      },
    };

    const prize = await createPrize(prizeData);

    if (!prize.id) {
      throw new Error("No se pudo crear el premio");
    }

    await associatePrizeToAuthor(prize.id, author.id);

    console.log("Autor, libro y premio creados exitosamente");
    return author;

  } catch (error) {
    console.error("Error creando author con libro y premio:", error);
    throw error;
  }
};

export const updateAuthor = (id: number, data: Partial<AuthorFormData>): Promise<Author> => {
  const authorData = {
    name: data.name,
    description: data.description,
    birthDate: data.birthDate,
    image: data.image,
  };

  return fetcher<Author>(`/authors/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authorData),
  });
};

export const deleteAuthor = async (id: number): Promise<void> => {
  try {
    console.log(`Attempting to delete author ${id}`);
    
    const response = await fetch(`http://127.0.0.1:8080/api/authors/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      console.error(`Delete failed with status: ${response.status}`);
    }
    
    console.log(`Author ${id} deletion processed`);
    
  } catch (error) {
    console.error(`Error during delete operation for author ${id}:`, error);
  }
};