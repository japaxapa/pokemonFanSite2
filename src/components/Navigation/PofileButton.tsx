import { Avatar, DropdownMenu, Flex } from '@radix-ui/themes'
import { useNavigate } from '@tanstack/react-router'

export default function ProfileButton() {
  const navigate = useNavigate()

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
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Flex>
  )
}
