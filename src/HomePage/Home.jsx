import { useNavigate } from 'react-router-dom';  // Import useNavigate
import HomeNav from './HomeNav';
import backtruck from '../assets/BackgroundImg/truck4.jpg';
import Services from './Services';
import WhyMove from './WhyMove';
import ChatBot from 'react-simple-chatbot';
import Footer from './Footer';

const Home = () => {
  const navigate = useNavigate(); // Initialize navigate

  // chatbot steps
  const steps = [
    {
      id: '1',
      message: 'What is your name?',
      trigger: '2',
    },
    {
      id: '2',
      user: true,
      trigger: '3',
    },
    {
      id: '3',
      message: 'Hi {previousValue}, nice to meet you!',
      trigger: '4',
    },
    {
      id: '4',
      message: 'How can I assist?',
      trigger: '5',
    },
    {
      id: '5',
      options: [
        { value: 'local', label: 'Local Move', trigger: 'handleLocalMove' },
        { value: 'distance', label: 'Distance Move', trigger: 'handleDistanceMove' },
        { value: 'business', label: 'Business Move', trigger: 'handleBusinessMove' },
      ],
    },
    
    {
      id: 'handleLocalMove',
      message: 'Services > Local Move',
      end: true, // Ensure this ends the conversation
      handler: () => {
        navigate('/');  // Redirect to the Local Move page
      },
    },
    {
      id: 'handleDistanceMove',
      message: 'Redirecting to Distance Move...',
      end: true, // Ensure this ends the conversation
      handler: () => {
        navigate('/');  // Redirect to the Distance Move page
      },
    },
    {
      id: 'handleBusinessMove',
      message: 'Redirecting to Business Move...',
      end: true, // Ensure this ends the conversation
      handler: () => {
        navigate('/');  // Redirect to the Business Move page
      },
    },
  ];

  return (
    <div className='max-w-6xl mx-auto px-4'>
      <div>
        <HomeNav />
      </div>
      <div
        className="relative bg-cover bg-center h-64 w-full"
        style={{ backgroundImage: `url(${backtruck})` }}
      >
        <div className="inset-0 flex flex-col items-center justify-center text-white h-full">
          <h1 className='mt-10 text-4xl lg:text-5xl'>
            <strong> Local & Long Distance Moving</strong>
          </h1>
          <p className='text-white py-10 text-center text-lg'>
            Professional removal services from packing to unpacking
          </p>
          <div className='text-center text-white'>
            <button className='px-4 py-2 bg-black bg-opacity-50 text-white rounded-md hover:bg-opacity-75'>
              Services
            </button>
            <button className='px-4 py-2 ml-2 bg-black bg-opacity-50 text-white rounded-md hover:bg-opacity-75'>
              About
            </button>
          </div>
        </div>
      </div>
      <Services />
      <div className='py-6'>
        <WhyMove />
      </div>
      <Footer />

      <ChatBot 
        steps={steps}
        floating={true}
        botDelay={1000}
        // Ensure that the chatbot is not showing multiple messages simultaneously
        // This should be handled by the steps configuration
      />
    </div>
  );
};

export default Home;
