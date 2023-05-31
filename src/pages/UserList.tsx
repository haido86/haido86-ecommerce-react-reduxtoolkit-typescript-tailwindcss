import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../components/button'
import { fetchUsers } from '../slices/userSlice'
import { AppDispatch, RootState } from '../store/store'

function UserList() {
  const { users, auth } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

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
      <h2 className="text-3xl font-extrabold mb-5">User List</h2>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                {/* head */}
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Username
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ban User
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users?.filteredUserArr.length > 0
                    ? users?.filteredUserArr?.map((user, index) => (
                        <tr key={user.id}>
                          <th>{index + 1}</th>
                          <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                          <td key={user.id} className="px-6 py-4 whitespace-nowrap">
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
                          <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                          <td key={user.id} className="px-6 py-4 whitespace-nowrap">
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
        </div>
      </div>
    </div>
  )
}

export default UserList
