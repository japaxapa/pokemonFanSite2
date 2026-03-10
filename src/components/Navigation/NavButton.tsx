import { Flex } from '@radix-ui/themes'

export default function NavButton({ children }: { children: React.ReactNode }) {
  return (
    <Flex justify={'center'} flexGrow={'1'}>
      {children}
    </Flex>
  )
}
