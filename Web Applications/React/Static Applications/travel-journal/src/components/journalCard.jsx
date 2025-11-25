export default function JournalCard({ imgSrc, title, metaData, content }) {
  return (
    <article className="journal-card">
      <img src={imgSrc} alt={`A photo of ${title}`} />
      <div className="card-text">
        <h3>{title}</h3>
        <p className="meta-data">{metaData}</p>
        <p>{content}</p>
        <a href="#" className="read-more">Read Full Story →</a>
      </div>
    </article>
  );
}
