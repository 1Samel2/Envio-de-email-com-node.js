const nodemailer = require('nodemailer');
const express = require('express');
const ejs = require('ejs');

const app = express();


app.get("/sendmail", async (req, res) => {
    //transporter
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "usuario",
            pass: "senha"
        }
    });



    //configuraçãod do email
    let message = await transport.sendMail({
        from: '"Fred Foo 👻" <samuelsmavi@gmail.com>',
        to: 'samuelsmavi@gmail.com',
        subject: 'Hello ✔',
        text: 'Hello world?',
        html: '<p>Hello world?</p>'
    });


    res.send("enviou")
})
app.get("/sendhtml", (req, res) => {

    ejs.renderFile(__dirname + "/ativacaoDeCadastro.ejs", function (err, data) {
        if (err) {
            console.log(err);
        } else {
            //transporter
            const transport = nodemailer.createTransport({
                host: "smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: "usuario",
                    pass: "senha"
                }
            });

            let mailOptions = {
                from: '"Fred Foo 👻" samuelsmavi@gmail.com',
                to: 'samuelsguedes@hotmail.com',
                subject: 'Hello ✔',
                html: data
            }

            transport.sendMail(mailOptions, function (err, info) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Mensagem enviada");
                }
            })
        }

    })

    res.send("e-mail enviado")
})

app.listen(3001, () => {
    console.log('Server started on port 3001');
})