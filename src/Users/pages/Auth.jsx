import React, { useState } from 'react';
import { motion } from 'framer-motion';

import UsersList from '../components/Users/UsersList';
import LoginForm from '../components/Form/LoginForm';
import SignupForm from '../components/Form/SignupForm';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleIsLogin = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  const pageVariants = {
    initial: { opacity: 0, x: '100vw' },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: '-100vw' },
  };

  const variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <>
      <div className="bg-zinc-50 h-screen">
        <motion.div
          className="flex items-center justify-center pt-32 pb-5 flex-col"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <UsersList />

          <div className="w-80">
            <div className="flex items-center justify-between mb-4">
              <motion.button
                onClick={() => setIsLogin(true)}
                className={`w-1/2 text-center py-2 rounded-t-lg ${
                  isLogin
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-300 text-gray-500'
                }`}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                Login
              </motion.button>
              <motion.button
                onClick={() => setIsLogin(false)}
                className={`w-1/2 text-center py-2 rounded-t-lg ${
                  !isLogin
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                Sign Up
              </motion.button>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4">
              {isLogin ? (
                <LoginForm />
              ) : (
                <SignupForm onSignupSuccess={toggleIsLogin} />
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Auth;
