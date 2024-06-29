import { notFound } from 'next/navigation';
import { db } from '@/db';

interface PostShowProps {
  postId: string;
}

export default async function PostShow({ postId }: PostShowProps) {
  //since this component is not reused anywhere, the query is made here itself.
  await new Promise(resolve => setTimeout(resolve, 2500)) // for testing the react suspense feature.
  const post = await db.post.findFirst({
    where: { id: postId },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="m-4">
      <h1 className="text-2xl font-bold my-2">{post.title}</h1>
      <p className="p-4 border rounded">{post.content}</p>
    </div>
  );
}
