import React, { createContext, useState, useEffect } from 'react';
import { initialWebsites } from '../data/websites';

export const WebsiteContext = createContext();

export const WebsiteProvider = ({ children }) => {
  const [websites, setWebsites] = useState([]);

  useEffect(() => {
    const savedWebsites = localStorage.getItem('marketplace_websites_v10');
    if (savedWebsites) {
      setWebsites(JSON.parse(savedWebsites));
    } else {
      setWebsites(initialWebsites);
      localStorage.setItem('marketplace_websites_v10', JSON.stringify(initialWebsites));
    }
  }, []);

  const saveWebsites = (newWebsites) => {
    setWebsites(newWebsites);
    localStorage.setItem('marketplace_websites_v10', JSON.stringify(newWebsites));
  };

  const addWebsite = (website) => {
    const newWebsites = [...websites, website];
    saveWebsites(newWebsites);
  };

  const editWebsite = (updatedWebsite) => {
    const newWebsites = websites.map(w => w.websiteId === updatedWebsite.websiteId ? updatedWebsite : w);
    saveWebsites(newWebsites);
  };

  const deleteWebsite = (websiteId) => {
    const newWebsites = websites.filter(w => w.websiteId !== websiteId);
    saveWebsites(newWebsites);
  };

  return (
    <WebsiteContext.Provider value={{ websites, addWebsite, editWebsite, deleteWebsite }}>
      {children}
    </WebsiteContext.Provider>
  );
};
