import { useState } from 'react'
import { useSelector } from 'react-redux'
import Button from '../components/button'
import { RootState } from '../store/store'

function UserList() {
  const { users, auth } = useSelector((state: RootState) => state)
  const [buttonStates, setButtonStates] = useState<{ [userId: number]: string }>(
    users?.usersData?.reduce((acc, user) => ({ ...acc, [user.id]: 'Ban this user' }), {})
  )

  if (!auth || !auth.loginUser || auth?.loginUser?.role !== 'ADMIN') {
    return <div>Cannot access to this page</div>
  }

  const handleButtonChange = (userId: number) => {
    setButtonStates((prevButtonStates) => ({
      ...prevButtonStates,
      [userId]: prevButtonStates[userId] === 'Ban this user' ? 'Unbanned' : 'Ban this user'
    }))
  }

  return (
    <div>
      <h2 className="flex justify-items-center mt-5 mb-10 font-bold text-xl">UserList</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>User ID</th>
              <th>Username</th>
              <th>Ban User</th>
            </tr>
          </thead>
          <tbody>
            {users?.filteredUserArr.length > 0
              ? users?.filteredUserArr?.map((user, index) => (
                  <tr key={user.id}>
                    <th>{index + 1}</th>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td key={user.id}>
                      <Button
                        onClick={() => handleButtonChange(user.id)}
                        className={
                          buttonStates[user.id] === 'Unbanned'
                            ? 'bg-red-500  text-white rounded-full px-2 py-1 cursor-pointer'
                            : 'bg-green-400 rounded-full px-2 py-1 cursor-pointer'
                        }>
                        {buttonStates[user.id] ? buttonStates[user.id] : 'Ban this user'}
                      </Button>
                    </td>
                  </tr>
                ))
              : users?.usersData?.map((user, index) => (
                  <tr key={user.id}>
                    <th>{index + 1}</th>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td key={user.id}>
                      <Button
                        onClick={() => handleButtonChange(user.id)}
                        className={
                          buttonStates[user.id] === 'Unbanned'
                            ? 'bg-red-500  text-white rounded-full px-2 py-1 cursor-pointer'
                            : 'bg-green-400 rounded-full px-2 py-1 cursor-pointer'
                        }>
                        {buttonStates[user.id] ? buttonStates[user.id] : 'Ban this user'}
                      </Button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserList
