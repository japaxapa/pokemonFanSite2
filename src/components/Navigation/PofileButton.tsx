import { Avatar, DropdownMenu, Flex } from '@radix-ui/themes'
import { useNavigate } from '@tanstack/react-router'
import { useTheme } from 'next-themes'

export default function ProfileButton() {
  const navigate = useNavigate()
  const { setTheme } = useTheme()

  return (
    <Flex p={'4'}>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Flex>
            <Avatar
              src="https://placehold.co/600x400.png"
              fallback={'P'}
              radius="full"
            />
            <DropdownMenu.TriggerIcon />
          </Flex>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content>
          <DropdownMenu.Item onClick={() => navigate({ to: '/favorites' })}>
            Favorites
          </DropdownMenu.Item>
          <DropdownMenu.Item onClick={() => navigate({ to: '/myteams' })}>
            Saved Teams
          </DropdownMenu.Item>

          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger>Theme</DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent>
              <DropdownMenu.Item onClick={() => setTheme('light')}>
                Light
              </DropdownMenu.Item>
              <DropdownMenu.Item onClick={() => setTheme('dark')}>
                Dark
              </DropdownMenu.Item>
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Flex>
  )
}
