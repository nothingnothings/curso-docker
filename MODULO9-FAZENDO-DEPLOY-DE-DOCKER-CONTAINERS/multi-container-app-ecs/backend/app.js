const fs = require('fs');
const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Goal = require('./models/goal');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/goals', async (req, res) => {
  console.log('TRYING TO FETCH GOALS');
  try {
    const goals = await Goal.find();
    res.status(200).json({
      goals: goals.map((goal) => ({
        id: goal.id,
        text: goal.text,
      })),
    });
    console.log('FETCHED GOALS');
  } catch (err) {
    console.error('ERROR FETCHING GOALS');
    console.error(err.message);
    res.status(500).json({ message: 'Failed to load goals.' });
  }
});

app.post('/goals', async (req, res) => {
  console.log('TRYING TO STORE GOAL');
  const goalText = req.body.text;

  if (!goalText || goalText.trim().length === 0) {
    console.log('INVALID INPUT - NO TEXT');
    return res.status(422).json({ message: 'Invalid goal text.' });
  }

  const goal = new Goal({
    text: goalText,
  });

  try {
    await goal.save();
    res
      .status(201)
      .json({ message: 'Goal saved', goal: { id: goal.id, text: goalText } });
    console.log('STORED NEW GOAL');
  } catch (err) {
    console.error('ERROR FETCHING GOALS');
    console.error(err.message);
    res.status(500).json({ message: 'Failed to save goal.' });
  }
});

app.delete('/goals/:id', async (req, res) => {
  console.log('TRYING TO DELETE GOAL');
  try {
    await Goal.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Deleted goal!' });
    console.log('DELETED GOAL');
  } catch (err) {
    console.error('ERROR FETCHING GOALS');
    console.error(err.message);
    res.status(500).json({ message: 'Failed to delete goal.' });
  }
});

mongoose.connect(


  //! ESSA FEATURE DE 'AUTO-RESOLVE CONTAINER NAME TO IP' NÃO _ VAI _ FUNCIONAR __ NO CONTEXTO DO 'ECS', justamente PQ A IDEIA DE 'NETWORKS', do DOCKER, NÃO VAI EXISTIR LÁ....
  // `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mongodb:27017/course-goals?authSource=admin`,
  
  //? PARA QUE SEU CONTAINER DO BACKEND CONSIGA ENCONTRAR O CONTAINER DO MONGODB NO 'AWS ECS', VC DEVE COLOCAR 'localhost' E __ OS SEUS 2 CONTAINERS EM 1 MESMA TASK (pq, em 1 mesma task, todos os containers ficam no CONTEXTO DE 1 MESMO 'LOCALHOST', NO CONTEXTO DE 1 MESMA MÁQUINA)...
  // `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@localhost:27017/course-goals?authSource=admin`,
  // ! UMA ALTERNATIVA MELHOR DO QUE USAR 1 CONTAINER DE 'MONGODB'/MYSQL DURANTE PRODUCTION É USAR UMA __ MANAGED SOLUTION, COMO 'MONGODB ATLAS' OU 'RDS' (RELATIONAL DATABASE SERVICE, NA AWS).
  // ! PODEMOS USAR O MONGODB ATLAS TANTO DURANTE DEVELOPMENT COMO PRODUCTION, BASTA PASSAR DIFERENTES VALUES PARA A PARTE DE 'DATABASE' NA CONNECTION STRING, POR MEIO DE ENVIRONMENT VARIABLES (aí usamos 1 DATABASE, no cluster, PARA DEV, PARA TESTES, E OUTRA DATABASE, NO CLUSTER, PARA __ PRODUCTION, PARA O MUNDO REAL)...
//  `mongodb+srv//nothingnothings:SENHA@cluster0.nhtjo.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`,

// `mongodb+srv//${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.nhtjo.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`,
  
`mongodb+srv//${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`,

// `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}:27017/course-goals?authSource=admin`,
  
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.error('FAILED TO CONNECT TO MONGODB');
      console.error(err);
    } else {
      console.log('CONNECTED TO MONGODB!!');
      app.listen(80);
    }
  }
);
