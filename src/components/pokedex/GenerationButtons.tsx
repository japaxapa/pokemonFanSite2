import { Button, Grid } from '@radix-ui/themes'

interface IRegionButtons {
  handleClick(
    offset: number,
    limit: number,
    enablePageController: boolean,
  ): void
}

const regions = [
  { name: 'Gen I', offset: 0, limit: 151 },
  { name: 'Gen II', offset: 151, limit: 100 },
  { name: 'Gen III', offset: 251, limit: 135 },
  { name: 'Gen IV', offset: 386, limit: 107 },
  { name: 'Gen V', offset: 493, limit: 156 },
  { name: 'Gen VI', offset: 649, limit: 72 },
  { name: 'Gen  VII', offset: 721, limit: 88 },
  { name: 'Gen VIII', offset: 809, limit: 96 },
  { name: 'Gen IX', offset: 905, limit: 120 },
  { name: 'All', offset: 0, limit: 50 },
]

export default function RegionButtons({ handleClick }: IRegionButtons) {
  return (
    <Grid gap={'2'} columns={{ initial: '2', sm: '3', md: '5' }}>
      {regions.map((region) => (
        <Button
          key={region.name}
          onClick={() =>
            handleClick(
              region.offset,
              region.limit,
              region.name == 'All' ? true : false,
            )
          }
        >
          {region.name}
        </Button>
      ))}
    </Grid>
  )
}
