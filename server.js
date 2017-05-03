var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static('public'));

mongoose.promise = global.Promise;
mongoose.connect('mongodb://localhost/tones');

var db = mongoose.connection;
db.on('error',
console.error.bind(console, 'Connection Error'));
db.once('open', function(){
  console.log('Database Connected!');
});

var Schema = mongoose.Schema;
var toneSchema = new Schema({
  name: String,
  type: Number,
  gain: Number,
  bass: Number,
  middle: Number,
  treble: Number
});

var Tone = mongoose.model('Tone', toneSchema);

app.get('/tones', function(req, res){
  Tone.find({}).exec(function(err, tones){
    if(err){
      return res.status(500).send(err);
    }
    return res.status(200).send(tones);
  });
});

app.post('/tones', function(req, res){
  var newTone = new Tone(req.body);
  newTone.save(function(err){
    if (err){
      return res.status(500).send(err);
    }
    return res.status(201).send();
  });
});

app.put('/tones', function(req, res){
  var id = req.body.id;
  Tone.findById({_id: id}, function(err, tone){
    if(err){
      return res.status(500).send();
    }
    tone.name = req.body.name;
    tone.type = req.body.type;
    tone.gain = req.body.gain;
    tone.bass = req.body.bass;
    tone.middle = req.body.middle;
    tone.treble = req.body.treble;

    tone.save(function(err, updatedTone){
      if(err){
        return res.status(500).send();
      }
      res.status(updatedTone).send();
    });
  });
});

app.delete('/tones', function(req, res){
  var id = req.body.id;
  Tone.remove({_id: id}, function(err){
    if (err){
      return res.status(500).send(err);
    }
    return res.status(204).send();
  });
});

app.listen(3333, function(){
  console.log('Listening');
});
