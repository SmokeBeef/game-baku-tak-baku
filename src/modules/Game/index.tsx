import { Button } from '@/components/ui/button';
import dataGame from '../../assets/tak-baku-vs-baku.json'

import { memo, useCallback, useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BakuTakBaku {
  baku: string;
  "tak-baku": string;
  pengertian: string
}


const GamePage = () => {
  const [currentData, setCurrentData] = useState<BakuTakBaku | null>()
  const [_, setAnswer] = useState<'baku' | 'tak-baku'>()
  const [alreadyAnswer, setAlreadyAnswer] = useState<boolean | null>()
  const [dataTrue, setDataTrue] = useState<'left' | 'rigth'>('left')

  const randomizer = useCallback(() => {
    const randomElement = dataGame[Math.floor(Math.random() * dataGame.length)];
    setCurrentData(randomElement)
    const randomDataTrue = Math.floor(Math.random() * 2)
    setDataTrue(!!randomDataTrue ? 'rigth' : 'left')
    setAnswer(undefined)
    setAlreadyAnswer(null)
  }, [dataGame, setCurrentData, setDataTrue, setAnswer, setAlreadyAnswer])

  const onClikAnswer = useCallback((isBaku: boolean) => {
    setAlreadyAnswer(true)
    setAnswer(isBaku ? 'baku' : 'tak-baku')
  }, [setAlreadyAnswer, setAnswer])

  const onClickSelanjutnya = useCallback(() => {
    randomizer()
  }, [randomizer])

  useEffect(() => {
    randomizer()
  }, [])

  return (
    <div className="px-4 mt-4">

      <div className='container mx-auto'>
        <Card className='max-w-[600px] mx-auto'>
          <CardHeader>
            <CardTitle className='text-2xl text-center'>Game Tebak Kata Baku</CardTitle>
          </CardHeader>
          <CardContent>
            {currentData && (
              <>
                <div className="flex gap-4 justify-center items-center">
                  <div className="w-full max-w-40 aspect-square">
                    <Button className={`w-full h-full ${alreadyAnswer && (dataTrue == 'left' ? '!bg-green-400/50' : '!bg-red-400/50')}`} color='red' variant={'outline'} onClick={() => onClikAnswer(dataTrue == 'left')}>
                      {dataTrue == 'left' ? currentData.baku : currentData['tak-baku']}
                    </Button>
                  </div>
                  <div className="w-full max-w-40 aspect-square">
                    <Button className={`w-full h-full ${alreadyAnswer && (dataTrue == 'rigth' ? '!bg-green-400/50' : '!bg-red-400/50')}`} variant={'outline'} onClick={() => onClikAnswer(dataTrue == 'rigth')}>
                      {dataTrue == 'rigth' ? currentData.baku : currentData['tak-baku']}
                    </Button>
                  </div>
                </div>
              </>
            )}
            {alreadyAnswer && (
              <>
                <div className="mt-4">
                  <p className='text-center'>Pengertian : {currentData?.pengertian}</p>
                </div>
                <Button className='mt-4' onClick={onClickSelanjutnya}>
                  Selanjutnya
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default memo(GamePage)
