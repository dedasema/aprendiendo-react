import { Card, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from "@mui/material"
import { useQuestionsStore } from "./store/questions"
import SyntaxHighLighter from 'react-syntax-highlighter'
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { type Question as QuestionType } from "./store/types"
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material"

const Question = ({info}: {info: QuestionType}) => {
    const selectedAnswer = useQuestionsStore((state) => state.selectAnswer);
    const createHandleClick = (answerIndex: number) => () => {
        selectedAnswer(info.id, answerIndex);
    }
    const getBackgroundColor = (info: QuestionType, index: number) => {
        const {correctAnswer, userSelectedAnswer} = info;
        //usuario no ha seleccionado una respuesta
        if(userSelectedAnswer === null){
            return 'transparent';
        }
        //usuario ha seleccionado una respuesta pero es incorrecta
        if(userSelectedAnswer === index && correctAnswer !== index){
            return '#ff000033';
        }
        //usuario ha seleccionado una respuesta y es correcta
        if(correctAnswer === index){
            return '#00ff0033';
        }
        //usuario ha seleccionado una respuesta y es incorrecta
        if(index === userSelectedAnswer){
            return '#ff000033';
        }
        //si no es ninguna de las anteriores, entonces es transparente
        return 'transparent';
    }
    return (
        <Card variant='outlined' sx={{bgcolor: '#222', p: 2, textAlign: 'left', marginTop: 4}}>
            <Typography variant='h5'>
                {info.question}
            </Typography>
            <SyntaxHighLighter language='javascript' style={gradientDark}>
                {info.code}
            </SyntaxHighLighter>
            <List sx={{bgcolor: '#333'}} disablePadding>
                {info.answers.map((answer, index) => (
                    <ListItem key={index} disablePadding divider>
                        <ListItemButton 
                            disabled={info.userSelectedAnswer !== null}
                            onClick={createHandleClick(index)}
                            sx={{backgroundColor: getBackgroundColor(info, index)}}
                            >
                            <ListItemText primary={answer} sx={{textAlign: 'center'}}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Card>
    )
}
export const Game = () => {
    const questions = useQuestionsStore((state) => state.questions);
    const currentQuestion = useQuestionsStore((state) => state.currentQuestion);
    const goNextQuestion = useQuestionsStore((state) => state.goNextQuestion);
    const goPrevQuestion = useQuestionsStore((state) => state.goPrevQuestion);
    const questionInfo = questions[currentQuestion];
    return (
        <>
            <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
                <IconButton onClick={goPrevQuestion} disabled={currentQuestion === 0}>
                    <ArrowBackIosNew/>
                </IconButton>
                {currentQuestion + 1} / {questions.length}
                <IconButton onClick={goNextQuestion} disabled={currentQuestion >= questions.length - 1}>
                    <ArrowForwardIos/>
                </IconButton>
            </Stack>
            <Question info={questionInfo}/>
        </>
    )
}