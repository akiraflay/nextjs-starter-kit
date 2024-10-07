"use client"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import config from '@/config';
import { useUser } from '@/lib/auth'
import { authenticateUser } from '@/lib/auth';

export default function SettingsPage() {
  const { user, isLoading } = useUser()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <div>User not found</div>
  }

  return (
    <div className="flex justify-start items-center flex-wrap px-4 pt-5 gap-4">
      <div className="flex flex-col gap-3 mb-[5rem] w-full max-w-[700px]">
        <h2 className="mt-10 scroll-m-20 border-b pb-2 w-full text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          My Profile
        </h2>
        <div className="flex w-full gap-3 mt-3">
          <div className="flex flex-col gap-3 w-full">
            <Label htmlFor="first-name">First Name</Label>
            <Input
              id="first-name"
              disabled
              defaultValue={user.firstName || ''}
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <Label htmlFor="last-name">Last Name</Label>
            <Input
              id="last-name"
              disabled
              defaultValue={user.lastName || ''}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            disabled
            defaultValue={user.emailAddresses?.[0]?.emailAddress || ''}
          />
        </div>
      </div>
    </div>
  )
}