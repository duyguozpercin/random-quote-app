

export const QuoteCArd = ({quote, author}) => {
  return (
    <section className="QuoteCard">
      <p> {quote} </p>
      <p>{author}</p>
    </section>
  );
};