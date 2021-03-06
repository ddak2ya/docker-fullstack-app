// 필요한 모듈가져오기
 const express = require("express");
 const bodyParser = require("body-parser");
 
 const db = require('./db');
const { text } = require("body-parser");

 //Express  서버생성
  const app = express();

  // json형태로 오는 요청을 항목
   app.use(bodyParser.json());

    //  테이블 생성하기
    // db.pool.query('CREATE TABLE lists(   id INTEGER autoincrement, value text,primary Key(id)',
    // (err,results,fields)=>{
    //     console.log('results',results)
    // });

    //DB 리스트 테이블에 있는 모든데이터를 프론트 서버에 보내주기
    app.get('/api/values', function(req,res){
        //db  모든정보 가져오기
        db.pool.query("SELECT * FROM lists", (err,results,fileds)=>{
            if(err)
                return res.status(500).send(err);
            else
                return res.json(results)

        })
    })

   // 클라이언트에서 입력한 값을 db  등록
   app.post('/api/value', function (req, res, next){
       //데이터베이스에 값 넣어주기
       db.pool.query(`INSERT INTO lists(value) VALUES("${req.body.value}")`, 
        (err,results,fields) =>{
            if(err)
                return res.status(500).send(err)
            else  
                return res.json({success:true, value: req.body.value});
        }
       )
   })
   app.listen(5000,()=>{
       console.log(" 어플리케이션 서버가 5000에 시작되었습니다.");
   });

