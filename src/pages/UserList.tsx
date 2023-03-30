import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

function UserList() {
  const { users, auth } = useSelector((state: RootState) => state)
  const [buttonStates, setButtonStates] = useState<{ [userId: number]: string }>(
    users?.usersData?.reduce((acc, user) => ({ ...acc, [user.id]: 'Ban this user' }), {}) || {}
  )

  if (!auth || !auth.isLogin || auth?.isLogin?.role !== 'admin') {
    return <div>Cannot access to this page</div>
  }

  const handleButtonChange = (userId: number) => {
    setButtonStates((prevButtonStates) => ({
      ...prevButtonStates,
      [userId]: prevButtonStates[userId] === 'Ban this user' ? 'Unbanned' : 'Ban this user'
    }))
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="font-bold text-xl">UserList</h2>

      <table className="flex flex-col w-full p-5">
        <tbody>
          <tr className="flex justify-around border border-gray-300">
            <th>User ID</th>
            <th>Name</th>
            <th>E-mail</th>
            <th>Ban User</th>
          </tr>

          {users?.usersData?.map((user) => (
            <tr key={user.id} className="flex justify-around border border-t-gray-300">
              <td>{user.id}</td>
              <td>
                {user.firstName}
                {user.lastName}
              </td>
              <td>{user.email}</td>
              <td key={user.id}>
                <button
                  onClick={() => handleButtonChange(user.id)}
                  className={
                    buttonStates[user.id] === 'Ban this user'
                      ? 'bg-green-400 rounded-full px-2 py-1 cursor-pointer'
                      : 'bg-red-500  text-white rounded-full px-2 py-1 cursor-pointer'
                  }>
                  {buttonStates[user.id]}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
