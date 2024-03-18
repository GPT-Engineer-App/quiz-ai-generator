import React, { useState } from "react";
import { Box, Heading, Text, VStack, Button, Radio, RadioGroup, useToast } from "@chakra-ui/react";
import { FaRedo } from "react-icons/fa";

const quizData = [
  {
    question: "Qual é o tratamento de escolha para pneumonia adquirida na comunidade?",
    options: ["Amoxicilina", "Azitromicina", "Levofloxacino", "Ceftriaxona"],
    answer: "Amoxicilina",
  },
  {
    question: "Qual é o principal fator de risco para trombose venosa profunda?",
    options: ["Idade avançada", "Imobilização prolongada", "Uso de contraceptivos orais", "Tabagismo"],
    answer: "Imobilização prolongada",
  },
  // Adicione mais questões aqui
];

const Index = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const toast = useToast();

  const handleAnswerOption = (value) => {
    setSelectedAnswer(value);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === quizData[currentQuestion].answer) {
      setScore(score + 1);
      toast({
        title: "Resposta correta!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Resposta incorreta!",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer("");
    } else {
      setShowScore(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setScore(0);
    setShowScore(false);
  };

  return (
    <Box p={8}>
      <Heading as="h1" mb={8}>
        Quiz de Residência Médica
      </Heading>
      {showScore ? (
        <VStack spacing={4}>
          <Text fontSize="xl">
            Você acertou {score} de {quizData.length} questões!
          </Text>
          <Button leftIcon={<FaRedo />} onClick={handleRestartQuiz}>
            Refazer Quiz
          </Button>
        </VStack>
      ) : (
        <VStack spacing={8} align="start">
          <Box>
            <Text fontSize="xl" fontWeight="bold">
              Questão {currentQuestion + 1}:
            </Text>
            <Text fontSize="lg">{quizData[currentQuestion].question}</Text>
          </Box>
          <RadioGroup value={selectedAnswer} onChange={handleAnswerOption}>
            <VStack align="start">
              {quizData[currentQuestion].options.map((option) => (
                <Radio key={option} value={option}>
                  {option}
                </Radio>
              ))}
            </VStack>
          </RadioGroup>
          <Button colorScheme="blue" onClick={handleSubmitAnswer} disabled={!selectedAnswer}>
            Enviar Resposta
          </Button>
        </VStack>
      )}
    </Box>
  );
};

export default Index;
