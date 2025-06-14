import { Quote } from '../../QuotesContextProvider';

interface QuoteCardProps {
  quote: string;
  author: string;
  likeCount: number;
}

export const QuoteCard = ({ quote, author, likeCount }: QuoteCardProps) => {
  return (
    <section className="max-w-2xl bg-white p-10 rounded-xl text-sm my-5 mx-auto text-gray-600 text-center">
      <p className="italic mb-5">{quote}</p>
      <p className="text-slate-500">— {author}</p>
      <p className="mt-4 text-fuchsia-400 text-xs">💖 Likes: {likeCount}</p>
    </section>
  );
};
