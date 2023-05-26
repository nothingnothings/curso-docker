import React, { useState, useEffect } from 'react';

import GoalInput from './components/goals/GoalInput';
import CourseGoals from './components/goals/CourseGoals';
import ErrorAlert from './components/UI/ErrorAlert';



//  é assim que vamos DIFERENCIAR O CÓDIGO DE CONNECT DO REACT APP FRONTEND, durante development e production (PQ NÃO PODEMOS USAR AS ENVIRONMENT VARIABLES DO DOCKER COM O REACT APP, JUSTAMENTE PQ O REACT APP VAI RODAR NO BROWSER DOS USERS, E NÃO EM 1 MÁQUINA EM QUE O DOCKER ESTÁ RODANDO)...
const backendUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:80'
    : 'URL-EM-QUE-VAMOS-RODAR-O-BACKEND-NO-AWS-ECS'; //FORMATO: 'https://ecs-lb-121251251.us-east-2.elb.amazonaws.com'






function App() {
  const [loadedGoals, setLoadedGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(function () {
    async function fetchData() {
      setIsLoading(true);

      try {
        //! VERSÃO QUE FUNCIONA DE MODO LOCAL... (ambiente de dev, dockerfile de development)...
        // const response = await fetch('http://localhost/goals');

        //VERSÃO QUE FUNCIONA EM PROD, NA AWS ECS (basta que vc coloque O FRONTEND E O BACKEND EM 1 MESMA TASK, em 1 mesmo contexto... aí essa route sem o DOMAIN vai funcionar)...
        ///? MAS PQ ISSO FUNCIONA?
        // É PQ, POR DEFAULT,

        // ESSE REQUEST VAI SER ENVIADO

        // AO '''MESMO SERVER QUE FOI USADO PARA FAZER SERVE DESSE WEBSITE'''... (que, no caso, será o servidor node em que DEFINIMOS OS ENDPOINTS...)

        //   (ESSE É UM COMPORTAMENTO DEFAULT DO BROWSER...)...
        //VERSÃO QUE FUNCIONA EM PROD, NA AWS ECS (basta que vc coloque O FRONTEND E O BACKEND EM 1 MESMA TASK, em 1 mesmo contexto... aí essa route sem o DOMAIN vai funcionar)...
        //?  mas como NÃO  CONSEGUIMOS FAZER SERVE DO FRONTEND E DO BACKEND EM 1 MESMO SERVICE/TASK, SOMOS FORÇADOS A DEIXAR DE LADO ESSE APPROACH...
        // const response = await fetch('/goals');

        const response = await fetch(backendUrl);

        const resData = await response.json();

        if (!response.ok) {
          throw new Error(resData.message || 'Fetching the goals failed.');
        }

        setLoadedGoals(resData.goals);
      } catch (err) {
        setError(
          err.message ||
            'Fetching goals failed - the server responsed with an error.'
        );
      }
      setIsLoading(false);
    }

    fetchData();
  }, []);

  async function addGoalHandler(goalText) {
    setIsLoading(true);

    try {
      //! VERSÃO QUE FUNCIONA DE MODO LOCAL... (ambiente de dev, dockerfile de development)...
      // const response = await fetch('http://localhost/goals', {
      //VERSÃO QUE FUNCIONA EM PROD, NA AWS ECS (basta que vc coloque, na ecs, O FRONTEND E O BACKEND EM 1 MESMA TASK, em 1 mesmo contexto... aí essa route sem o DOMAIN vai funcionar)...
      //?  mas como NÃO  CONSEGUIMOS FAZER SERVE DO FRONTEND E DO BACKEND EM 1 MESMO SERVICE/TASK, SOMOS FORÇADOS A DEIXAR DE LADO ESSE APPROACH...
      // const response = await fetch('/goals', {
      const response = await fetch(backendUrl, {
        method: 'POST',
        body: JSON.stringify({
          text: goalText,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || 'Adding the goal failed.');
      }

      setLoadedGoals((prevGoals) => {
        const updatedGoals = [
          {
            id: resData.goal.id,
            text: goalText,
          },
          ...prevGoals,
        ];
        return updatedGoals;
      });
    } catch (err) {
      setError(
        err.message ||
          'Adding a goal failed - the server responsed with an error.'
      );
    }
    setIsLoading(false);
  }

  async function deleteGoalHandler(goalId) {
    setIsLoading(true);

    try {
      //! VERSÃO QUE FUNCIONA DE MODO LOCAL... (ambiente de dev, dockerfile de development)...
      // const response = await fetch('http://localhost/goals/' + goalId, {

      //VERSÃO QUE FUNCIONA EM PROD, NA AWS ECS (basta que vc coloque, na ecs, O FRONTEND E O BACKEND EM 1 MESMA TASK, em 1 mesmo contexto... aí essa route sem o DOMAIN vai funcionar)...
      //?  mas como NÃO  CONSEGUIMOS FAZER SERVE DO FRONTEND E DO BACKEND EM 1 MESMO SERVICE/TASK, SOMOS FORÇADOS A DEIXAR DE LADO ESSE APPROACH...
      // const response = await fetch('/goals/' + goalId, {
      const response = await fetch(backendUrl + '/' + goalId, {
        method: 'DELETE',
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || 'Deleting the goal failed.');
      }

      setLoadedGoals((prevGoals) => {
        const updatedGoals = prevGoals.filter((goal) => goal.id !== goalId);
        return updatedGoals;
      });
    } catch (err) {
      setError(
        err.message ||
          'Deleting the goal failed - the server responsed with an error.'
      );
    }
    setIsLoading(false);
  }

  return (
    <div>
      {error && <ErrorAlert errorText={error} />}
      <GoalInput onAddGoal={addGoalHandler} />
      {!isLoading && (
        <CourseGoals goals={loadedGoals} onDeleteGoal={deleteGoalHandler} />
      )}
    </div>
  );
}

export default App;
