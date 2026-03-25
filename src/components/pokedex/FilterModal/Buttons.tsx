import { Button, Dialog, Flex } from "@radix-ui/themes";

export default function FilterModalButtons() {
  return (
    <Flex gap="3" mt="4" justify="end">
      <Dialog.Close>
        <Button variant="soft" color="gray">
          Cancel
        </Button>
      </Dialog.Close>
      <Dialog.Close>
        <Button type="submit">Apply</Button>
      </Dialog.Close>
    </Flex>
  )
}
