const fs = require('fs').promises;
const exists = require('fs').exists;
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));
app.use('/feedback', express.static('feedback'));

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'pages', 'feedback.html');
  res.sendFile(filePath);
});

app.get('/exists', (req, res) => {
  const filePath = path.join(__dirname, 'pages', 'exists.html');
  console.log('SOMETHING');
  res.sendFile(filePath);
});

app.post('/create', async (req, res) => {
  const title = req.body.title;
  const content = req.body.text;
  console.log('ENTERED');

  const adjTitle = title.toLowerCase();

  const tempFilePath = path.join(__dirname, 'temp', adjTitle + '.txt');
  const finalFilePath = path.join(__dirname, 'feedback', adjTitle + '.txt');

  await fs.writeFile(tempFilePath, content);
  exists(finalFilePath, async (exists) => {
    if (exists) {
      res.redirect('/exists');
    } else {
      // await fs.rename(tempFilePath, finalFilePath);
      /// COM ISSO, MANUALMENTE COPIAMOS (pára o folder de 'feedback')__ E DELETAMOS O ARQUIVO ORIGINAL (em temp)
      await fs.copyFile(tempFilePath, finalFilePath);
      await fs.unlink(tempFilePath);
      res.redirect('/');
    }
  });
});

console.log("CHINELO")

// app.listen(80);


app.listen(process.env.PORT);  /////SERÁ SUBSTITUÍDO PELO VALUE DA ENVIRONMENT VARIABLE DE 'PORT', que por sua vez será MANIPULADA/DEFINIDA PELA INSTRUCTION DE 'ENV PORT 80' LÁ NO DOCKERFILE, E TAMBÉM PELO PASS DE 1 VALUE COMO ENVIRONMENT VALUE LÁ NO COMANDO 'DOCKER RUN', POR MEIO DA FLAG '--env' (tipo ''--env PORT=8000', que vai substituir o VALUE lá em 'EXPOSE PORT', no dockerFIle, e também VAI SUBSTITUIR ESSE VALUE DO 'app.listen(process.env.PORT)')