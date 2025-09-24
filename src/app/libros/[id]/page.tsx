import BookDetailPage from '@/modules/books/pages/bookDetailPage';

interface PageProps {
  params: {
    id: string;
  };
}

export default function BookDetail({ params }: PageProps) {
  const bookId = parseInt(params.id);
  
  if (isNaN(bookId)) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-600">ID de libro inválido</div>
      </div>
    );
  }

  return <BookDetailPage bookId={bookId} />;
}