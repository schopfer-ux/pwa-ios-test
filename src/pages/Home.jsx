import { TestNotification } from '../components/TestNotification';

function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Welcome to My PWA</h1>
      <p className="text-gray-600">
        This is a Progressive Web App with push notification support.
      </p>
      <TestNotification />
    </div>
  );
}

export default Home;