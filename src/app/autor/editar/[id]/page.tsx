import AuthorEditPage from '@/modules/authors/pages/AuthorEditPage';

export default async function EditAuthorPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const authorId = parseInt(id, 10);

  if (isNaN(authorId)) {
    return (
      <div className="container mx-auto p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Error</h1>
          <p className="text-red-500">ID de autor inválido</p>
        </div>
      </div>
    );
  }

  return <AuthorEditPage authorId={authorId} />;
}