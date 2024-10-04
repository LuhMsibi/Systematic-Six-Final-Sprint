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
      message: 'Welcome to PackItBuddy! What is your name?',
      trigger: '2',
    },
    {
      id: '2',
      user: true,
      trigger: '3',
    },
    {
      id: '3',
      message: 'Hi {previousValue}, nice to meet you! How can I assist you today?',
      trigger: '4',
    },
    {
      id: '4',
      message: 'Please choose an option:',
      trigger: '5',
    },
    {
      id: '5',
      options: [
        { value: 'local', label: 'Local Move', trigger: 'handleLocalMove' },
        { value: 'distance', label: 'Packing Service', trigger: 'handleDistanceMove' },
        { value: 'business', label: 'Business Move', trigger: 'handleBusinessMove' },
        { value: 'faq', label: 'FAQs', trigger: 'showFAQs' },
        { value: 'support', label: 'Customer Support', trigger: 'handleSupport' },
      ],
    },
    {
      id: 'handleLocalMove',
      message: 'To access Local Move services, please go to the "Services" section and click on "Local Move".',
      trigger: 'menuOptions',
    },
    {
      id: 'handleDistanceMove',
      message: 'To access Packing services, please go to the "Services" section and click on "Packing Service".',
      trigger: 'menuOptions',
    },
    {
      id: 'handleBusinessMove',
      message: 'To access Business Move services, please go to the "Services" section and click on "Business Move".',
      trigger: 'menuOptions',
    },
    {
      id: 'handleSupport',
      message: 'Our customer support is available 24/7. You can contact us at support@packitbuddy.com or call us at (123) 456-7890.',
      trigger: 'menuOptions',
    },
    {
      id: 'showFAQs',
      message: 'Here are some frequently asked questions:',
      trigger: 'faqOptions',
    },
    {
      id: 'faqOptions',
      options: [
        { value: 'resetPassword', label: 'How do I reset my password?', trigger: 'faqResetPassword' },
        { value: 'contactSupport', label: 'How can I contact customer service?', trigger: 'faqContactSupport' },
        { value: 'backToMenu', label: 'Back to Menu', trigger: 'menuOptions' },
      ],
    },
    {
      id: 'faqResetPassword',
      message: 'To reset your password go to your profle and scroll to the bottom and click "Change Password" and follow the steps',
      trigger: 'faqFollowUp',
    },
    {
      id: 'faqContactSupport',
      message: 'You can contact customer service through the "Support" section in the PackItBuddy app or by filling out the contact form in the support section.',
      trigger: 'faqFollowUp',
    },
    {
      id: 'faqFollowUp',
      message: 'Would you like to see another FAQ or return to the menu?',
      trigger: 'faqFollowUpOptions',
    },
    {
      id: 'faqFollowUpOptions',
      options: [
        { value: 'anotherFAQ', label: 'See Another FAQ', trigger: 'faqOptions' },
        { value: 'menu', label: 'Return to Menu', trigger: 'menuOptions' },
      ],
    },
    {
      id: 'menuOptions',
      message: 'Would you like to see the menu again or end the conversation?',
      trigger: 'menuChoice',
    },
    {
      id: 'menuChoice',
      options: [
        { value: 'showMenu', label: 'Show Menu Again', trigger: '4' },
        { value: 'endConversation', label: 'End Conversation', trigger: 'end' },
      ],
    },
    {
      id: 'end',
      message: 'Thank you for using PackItBuddy! Have a great day!',
      end: true,
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
