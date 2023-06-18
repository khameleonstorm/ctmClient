import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const TidioChatWidget = () => {
  const location = useLocation();

  useEffect(() => {
    // Show or hide the chat widget based on the current page
    if (location.pathname === '/home' || location.pathname === '/' || location.pathname === '/about' || location.pathname === '/contact' || location.pathname === '/signUp' || location.pathname === '/signUp/' || location.pathname === '/signUp/:ref' || location.pathname === '/login' || location.pathname === '/verify/:email' || location.pathname === '/resend-email/:email' || location.pathname === '/forgotPassword' || location.pathname === '/forgotPassword/:page') {
      window.tidioChatApi.show();
    } else {
      window.tidioChatApi.hide();
    }
  }, [location]);

  return null; // This component doesn't render anything
};

export default TidioChatWidget;
