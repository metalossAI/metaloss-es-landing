// fields/WaitlistCountField.tsx
import React, { useEffect, useState } from 'react';

const WaitlistCountField = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
      const res = await fetch('/api/waitlist-count');
      const data = await res.json() as { count: number };
      setCount(data.count);
    };

    fetchCount();
  }, []);

  return (
    <div>
      <strong>Waitlist entries:</strong> {count ?? 'Loading...'}
    </div>
  );
};

export default WaitlistCountField;
