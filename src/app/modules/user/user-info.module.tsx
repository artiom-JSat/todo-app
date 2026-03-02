'use client'

import dynamic from 'next/dynamic'

const UserInfoView = dynamic(
  () =>
    import('./elements/user-info-view.component').then(
      (mod) => mod.UserInfoView,
    ),
  {
    ssr: false,
    loading: () => <p className="text-gray-600">Loading...</p>,
  },
)

export function UserInfo() {
  return <UserInfoView />
}
