import { useSelector } from 'react-redux'
import { RootState } from '../store'

function UserList() {
  const { users, auth } = useSelector((state: RootState) => state)

  if (!auth || !auth.isLogin || auth?.isLogin?.role !== 'admin') {
    return <div>Cannot access to this page</div>
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="font-bold text-xl">UserList</h2>

      <table className="flex flex-col w-full p-5">
        <tr className="flex justify-around border border-gray-300">
          <th>User ID</th>
          <th>Name</th>
          <th>E-mail</th>
          <th>Ban User</th>
        </tr>
        {users?.usersData?.map((user) => (
          <>
            <tr key={user.email} className="flex justify-around border border-t-gray-300">
              <td>{user.id}</td>
              <td>
                {user.firstName}
                {user.lastName}
              </td>
              <td>{user.email}</td>
              <td>
                <button className="bg-gray-100 rounded-full px-2 py-1 cursor-pointer">
                  Ban this user
                </button>
              </td>
            </tr>
          </>
        ))}
      </table>
    </div>
  )
}

export default UserList
