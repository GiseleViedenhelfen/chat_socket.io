import React, { useState, useEffect } from 'react';

const OnlineUser = () => {
  const [users, setUsers] = useState([]);
  // useEffect(() => {
  //   socket.on('newUserResponse', (data) => setUsers(data));
  // }, [socket, users]);
  {console.log('users front => ', users)}
  return (
    <div className="chat__sidebar">
      {/* {console.log(users)} */}
       <h2>Open Chat</h2>
       <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
        {users.map((user) => (
            <p key={user.socketID}>{user.userName}</p>
          ))}
        </div>
      </div>
    </div>
  )
}
export default OnlineUser;