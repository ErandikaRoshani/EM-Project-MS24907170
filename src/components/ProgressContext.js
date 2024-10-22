import React, {createContext, useContext, useEffect, useState} from 'react';
import {auth, db} from '../../firebaseConfig';
import {doc, getDoc} from 'firebase/firestore';

// Create the context
const ProgressContext = createContext({});

// ProgressProvider component
export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState(0);
  const [level, setLevel] = useState();  // Make sure level and setLevel are included
  const [gems, setGems] = useState();
  const [challenges, setChallenges] = useState();
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          console.log(userData);
          setGems(userData?.gems ?? 0); // Initialize gems from Firestore
          setChallenges(userData?.challenges ?? [
            { level: 1, targetSteps: 1000, rewardGems: 10, isUnlocked: true, completed: false, completedSteps: 0, gpsSteps: 0, manualSteps: 0, totalSteps: 0 },
            { level: 2, targetSteps: 2000, rewardGems: 20, isUnlocked: false, completed: false, completedSteps: 0, gpsSteps: 0, manualSteps: 0, totalSteps: 0 },
            { level: 3, targetSteps: 3000, rewardGems: 30, isUnlocked: false, completed: false, gpsSteps: 0, manualSteps: 0, totalSteps: 0 },
            { level: 4, targetSteps: 4000, rewardGems: 40, isUnlocked: false, completed: false, gpsSteps: 0, manualSteps: 0, totalSteps: 0 },
            { level: 5, targetSteps: 5000, rewardGems: 50, isUnlocked: false, completed: false, gpsSteps: 0, manualSteps: 0, totalSteps: 0 },
          ]); // Initialize challenge data from Firestore
          setLevel(userData?.level ?? 1); // Initialize level from Firestore
        }
      }
    };
    fetchUserData().then();
  }, []);

  const updateProgress = (newProgress) => {
    setProgress(newProgress);
  };

  return (
    <ProgressContext.Provider value={{ progress, level, updateProgress, setLevel, gems, challenges, setChallenges, setGems }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgressContext = () => useContext(ProgressContext);
