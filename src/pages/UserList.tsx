import { useSelector } from 'react-redux'
import { RootState } from '../store'

function UserList() {
  const { users, auth } = useSelector((state: RootState) => state)

  if (!auth || !auth.isLogin || auth?.isLogin?.role !== 'admin') {
    return <div>Cannot access to this page</div>
  }

  return (
    <div>
      UserList
      <div>
        {users?.usersData?.map((user) => (
          <>
            <div key={user.email}>
              {user.firstName}
              {user.lastName}
              {user.email}
            </div>
            <button className="bg-gray-100 rounded-full px-2 py-1 cursor-pointer">
              Ban this user
            </button>
          </>
        ))}
      </div>
    </div>
  )
}

export default UserList
