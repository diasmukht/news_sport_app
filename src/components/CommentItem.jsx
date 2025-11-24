// src/components/CommentItem.jsx
export default function CommentItem({ comment }) {
  return (
    <div style={{
      background: 'white',
      padding: '16px',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      marginBottom: '12px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <strong style={{ color: '#1f2937' }}>{comment.author}</strong>
        <span style={{ color: '#64748b', fontSize: '14px' }}>{comment.date}</span>
      </div>
      <p style={{ margin: 0, color: '#374151', lineHeight: '1.5' }}>{comment.text}</p>
    </div>
  );
}