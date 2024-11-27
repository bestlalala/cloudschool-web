import React, { useEffect, useState } from 'react';
import './App.css'; // CSS 파일 임포트

// 사용자 데이터 타입 정의
type User = {
  userId: number;
  userName: string;
  userEmail: string;
};

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 서버 API 호출
        const response = await fetch('http://localhost:8080/api/user'); // 서버 주소를 실제 주소로 변경
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: User[] = await response.json(); // JSON으로 변환
        setUsers(data); // 데이터 상태 업데이트
      } catch (err: any) {
        setError('Failed to fetch data'); // 에러 처리
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    };

    fetchData();
  }, []); // 컴포넌트 처음 렌더링 시 한 번만 실행

  // 로딩 중이면 로딩 메시지 출력
  if (loading) {
    return <div>Loading...</div>;
  }

  // 에러가 있으면 에러 메시지 출력
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>User 목록</h1>
      <ul>
        {users.map(user => (
          <li key={user.userId}>
            {user.userId}: {user.userName} ({user.userEmail})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;