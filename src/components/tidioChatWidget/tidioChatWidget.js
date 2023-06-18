import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const TidioChatWidget = () => {
  const location = useLocation();

  useEffect(() => {
    // Show or hide the chat widget based on the current page
    if (location.pathname === '/dashboard' || location.pathname === '/admin') {
      window.tidioChatApi.hide();
    } else {
      window.tidioChatApi.show();
    }
  }, [location]);

  return null; // This component doesn't render anything
};

export default TidioChatWidget;
