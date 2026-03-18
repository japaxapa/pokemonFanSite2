import { GENERATIONS_PARAMS } from '#/constants/consts'
import { Button, Grid } from '@radix-ui/themes'

interface IRegionButtons {
  handleClick: (
    offset: number,
    limit: number,
    enablePageController: boolean,
  ) => void
}

export default function RegionButtons({ handleClick }: IRegionButtons) {
  return (
    <Grid gap={'2'} columns={{ initial: '2', sm: '3', md: '5' }}>
      {GENERATIONS_PARAMS.map((GENERATION_PARAM) => (
        <Button
          key={GENERATION_PARAM.name}
          onClick={() =>
            handleClick(
              GENERATION_PARAM.offset,
              GENERATION_PARAM.limit,
              GENERATION_PARAM.name == 'All' ? true : false,
            )
          }
        >
          {GENERATION_PARAM.name}
        </Button>
      ))}
    </Grid>
  )
}
