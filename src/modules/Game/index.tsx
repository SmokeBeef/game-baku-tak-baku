import { Button } from '@/components/ui/button';
import dataGame from '../../assets/tak-baku-vs-baku.json'

import { memo, useCallback, useMemo, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface BakuTakBaku {
  baku: string;
  "tak-baku": string;
  pengertian: string;
  indexData: number
}

interface LogAnswer {
  baku: string;
  "tak-baku": string;
  pengertian: string;
  indexData: number;
  isAnswerRight: boolean;
}


const GamePage = () => {
  const [gameStart, setGameStart] = useState(false)
  const [currentData, setCurrentData] = useState<BakuTakBaku | null>()
  const [_, setAnswer] = useState<'baku' | 'tak-baku'>()
  const [alreadyAnswer, setAlreadyAnswer] = useState<boolean | null>()
  const [dataTrue, setDataTrue] = useState<'left' | 'rigth'>('left')

  const [logAnswer, setLogAnswer] = useState<LogAnswer[]>([])

  const randomizer = useCallback(() => {
    const indexData = Math.floor(Math.random() * dataGame.length)
    const randomElement = dataGame[indexData];
    setCurrentData({ ...randomElement, indexData })
    const randomDataTrue = Math.floor(Math.random() * 2)
    setDataTrue(!!randomDataTrue ? 'rigth' : 'left')
    setAnswer(undefined)
    setAlreadyAnswer(null)
  }, [dataGame, setCurrentData, setDataTrue, setAnswer, setAlreadyAnswer])

  const onClikAnswer = useCallback((isBaku: boolean) => {
    setAlreadyAnswer(true)
    setAnswer(isBaku ? 'baku' : 'tak-baku')
    if (currentData)
      setLogAnswer(val => [{ ...currentData, isAnswerRight: isBaku }, ...val])
  }, [setAlreadyAnswer, setAnswer, currentData])

  const onClickSelanjutnya = useCallback(() => {
    randomizer()
  }, [randomizer])

  const handleGameStart = useCallback((isRestart?: boolean) => {
    setGameStart(true)
    if (isRestart) {
      setLogAnswer([])
    }
    randomizer()
  }, [setGameStart, randomizer])

  const handleGameStop = useCallback(() => {
    setGameStart(false)
    setCurrentData(null)
    setAnswer(undefined)
    setAlreadyAnswer(null)
  }, [setGameStart])

  const answerRight = useMemo(() => logAnswer.filter(v => v.isAnswerRight), [logAnswer])

  return (
    <div className="px-4 my-4">

      <div className='container mx-auto'>
        <Card className='max-w-[600px] mx-auto'>
          <CardHeader>
            <CardTitle className='text-2xl text-center'>Game Tebak Kata Baku</CardTitle>
          </CardHeader>
          <CardContent>
            {currentData && gameStart ? (
              <>
                <div className="flex mb-4">
                  <Button className='mx-auto' onClick={handleGameStop}>
                    Stop Game
                  </Button>
                </div>
                <div className="my-4">
                  <p className='text-center'>{currentData?.pengertian}</p>
                </div>
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
            ) : (
              <>
                <div className="flex justify-center gap-4">
                  <Button className='' onClick={() => handleGameStart(true)}>
                    Mulai Game
                  </Button>
                  {logAnswer.length > 0 && (
                    <Button variant={'outline'} onClick={() => handleGameStart()}>
                      Lanjut Game
                    </Button>
                  )}
                </div>
              </>
            )}
            {alreadyAnswer && gameStart && (
              <>
                <div className="flex">
                  <Button className='mt-4 mx-auto w-full sm:w-fit' onClick={onClickSelanjutnya}>
                    Selanjutnya
                  </Button>
                </div>
              </>
            )}
            {(logAnswer.length > 0 && !gameStart) && (
              <>
                <h3 className='text-xl font-semibold mt-4'>Total Penyelesaian Kata : {logAnswer.length}</h3>
                <h3 className='text-md font-semibold '>Total Benar : {answerRight.length}</h3>
                <h3 className='text-md font-semibold '>Total Salah : {logAnswer.filter(val => !val.isAnswerRight).length}</h3>
                <h4>Persentasi Benar : {((answerRight.length / logAnswer.length * 100)).toFixed(2)}%</h4>
                <Table className='mt-4'>
                  <TableCaption >List hasil dari game</TableCaption>
                  <TableHeader className='bg-secondary'>
                    <TableRow>
                      <TableHead className=''>
                        Kata
                      </TableHead>
                      <TableHead>
                        tak baku
                      </TableHead>
                      <TableHead className=''>
                        Pengertian
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {logAnswer.map((answer) => (
                      <TableRow className={answer.isAnswerRight ? 'bg-green-600/40 hover:bg-green-600/80' : 'bg-red-800/40 hover:bg-red-800/80'}>
                        <TableCell>{answer.baku}</TableCell>
                        <TableCell>{answer['tak-baku']}</TableCell>
                        <TableCell className=''>{answer['pengertian']}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            )}
          </CardContent>
        </Card>
      </div>
      {/* <p className='text-center font-sans mt-4 flex flex-col justify-center items-center  text-slate-200'>
        credit
        <a href="https://www.instagram.com/_deva_nandaa" target='_blank'>
          <span className='flex justify-center items-center gap-2'>
            <Instagram size={20} /> @_deva_nandaa
          </span>
        </a>
        <a href="https://www.instagram.com/_deva_nandaa" target='_blank'>
          <span className='flex justify-center items-center gap-2'>
            <Instagram size={20} /> @_deva_nandaa
          </span>
        </a>
      </p>
      <p className='text-center font-sans mt-4 flex flex-col justify-center items-center  text-slate-200'>
        Report Bug or Improvement
        <a href="https://github.com/SmokeBeef/game-baku-tak-baku/issues" target='_blank'>
          <span className='flex justify-center items-center gap-2'>
            <Github size={20} /> SmokeBeef
          </span>
        </a>
      </p> */}
    </div>
  )
}

export default memo(GamePage)
