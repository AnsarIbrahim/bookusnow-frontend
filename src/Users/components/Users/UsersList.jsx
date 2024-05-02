import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import LoadingSpinner from '../../../Shared/Components/LoadingSpinner/LoadingSpinner';
import { fetchUsers } from '../../../redux/userList/usersSlice';

const UsersList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <>
      {users.length === 0 && <LoadingSpinner asOverlay />}
      <div className="flex flex-wrap overflow-x-auto gap-5">
        {users.map(
          (user) =>
            user.image && (
              <div key={user._id} className="flex flex-col items-center pb-2">
                <img
                  src={`data:image/jpeg;base64,${user.image}`}
                  alt={user.username}
                  className=" w-12 h-12 object-cover rounded-xl m-2 shadow-lg"
                />
                <p className="text-xs font-inter flex flex-col items-center">
                  {user.username}{' '}
                  <span className="text-red-500">
                    {capitalizeFirstLetter(user.role)}
                  </span>
                </p>
              </div>
            )
        )}
      </div>
    </>
  );
};

export default UsersList;
