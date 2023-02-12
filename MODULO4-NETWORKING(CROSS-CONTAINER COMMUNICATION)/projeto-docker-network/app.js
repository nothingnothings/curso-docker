const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const mongoose = require('mongoose');

const Favorite = require('./models/favorite');

const app = express();

app.use(bodyParser.json());

app.get('/favorites', async (req, res) => {
  const favorites = await Favorite.find();
  res.status(200).json({
    favorites: favorites,
  });
});

app.post('/favorites', async (req, res) => {
  const favName = req.body.name;
  const favType = req.body.type;
  const favUrl = req.body.url;

  try {
    if (favType !== 'movie' && favType !== 'character') {
      throw new Error('"type should be "movie" or "character"!');
    }

    const existingFav = await Favorite.findOne({ name: favName });

    if (existingFav) {
      throw new Error('Favorite already exists.');
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  const favorite = new Favorite({
    name: favName,
    type: favType,
    url: favUrl,
  });

  try {
    await favorite.save();

    res.status(200).json({
      message: 'Favorite saved!',
      favorite: favorite.toObject(),
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

app.get('/movies', async (req, res) => {
  try {
    const response = await axios.get('https://swapi.dev/api/films');

    res.status(200).json({ movies: response.data });
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong.',
    });
  }
});

app.get('/people', async (req, res) => {
  try {
    const response = await axios.get('https://swapi.dev/api/films');

    res.status(200).json({ movies: response.data });
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong.',
    });
  }
});

app.listen(3000);

////CÓDIGO SEM COMUNICAÇÃO ENTRE 'DOCKER CONTAINER' e 'LOCAL HOST MACHINE' (coisas como UMA DATABASE LOCAL, RODANDO NA NOSSA MÁQUINA)...
// mongoose.connect(
//   'mongodb://localhost:27017/swfavorites',
//   { useNewUrlParser: true },
//   (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       app.listen(3000);
//     }
//   }
// );

// // CÓDIGO COM COMUNICAÇÃO ENTRE 'DOCKER CONTAINER' e 'LOCAL HOST MACHINE' (coisas como UMA DATABASE LOCAL, RODANDO NA NOSSA MÁQUINA)...
// ///sintaxe especial (que se refere a coisas NA SUA LOCAL MACHINE) -- 'host.docker.internal'
// mongoose.connect(
//   'mongodb://host.docker.internal:27017/swfavorites',
//   { useNewUrlParser: true },
//   (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       app.listen(3000);
//     }
//   }
// );

// CÓDIGO COM COMUNICAÇÃO ENTRE 'DOCKER CONTAINER' e 'DOCKER CONTAINER' (sendo que esse outro docker container ESTÁ RODANDO 1 IMAGE DE 'MONGODB', o que quer dizer que COLOCAMOS/rodamos NOSSA DATABASE EM OUTRO CONTAINER...)...
///sintaxe especial (que se refere ao IP INTERNO DE OUTRO CONTAINER, obtido por meio de 'docker inspect id_do_container') --
// mongoose.connect(
//   // 'mongodb://host.docker.internal:27017/swfavorites',
//   'mongodb://172.17.0.2:27017/swfavorites',
//   { useNewUrlParser: true },
//   (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       app.listen(3001);
//     }
//   }
// );




// CÓDIGO COM COMUNICAÇÃO ENTRE 'DOCKER CONTAINER' e 'DOCKER CONTAINER' (sendo que esse outro docker container ESTÁ RODANDO 1 IMAGE DE 'MONGODB', o que quer dizer que COLOCAMOS/rodamos NOSSA DATABASE EM OUTRO CONTAINER...)...
///sintaxe especial (que se refere ao NOME DE OUTRO CONTAINER, no caso "mongodb", que é o outro container que criamos, para esse app aí) --
////OBS::: PARA QUE ESSA SINTAXE FUNCIONE, VOCÊ PRECISA FAZER COM QUE AMBOS OS CONTAINERS PERTENÇAM À MESMA NETWORK... (criada com 'docker network create nome_da_network')... -> e podemos fazer eles pertencerem a 1 network já criada por meio da flag de 'docker run --network nome_da_network_ja_criada' 
mongoose.connect(
  // 'mongodb://host.docker.internal:27017/swfavorites',
  'mongodb://mongodb:27017/swfavorites',
  { useNewUrlParser: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(3001);
    }
  }
);
