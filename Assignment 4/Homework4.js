var express = require('express');
var usergrid = require('usergrid');
var app = express();
app.use(express.bodyParser());
  
var client = new usergrid.client({
    orgName:'ohenterprise',
    appName:'sandbox',
});
  
// GET ALL

app.get('/movies', function(req, res) {	
        getMovies(req, res);
});

function getMovies(req, res) {
    client.createCollection({
        type : 'movies'
    }, function(error, movies) {
        if (error) {
            res.jsonp(500, {
                'error' : JSON.stringify(err)
            });
            return;
        }
        var movs = [];
        while (movies.hasNextEntity()) {
            var mov = movies.getNextEntity().get();
            var populate = {
                'ID':mov.ID,
                'Name':mov.Name,
                'Starring':mov.Starring,
                'Year':mov.Year,
                'Director':mov.Director
            };
            movs.push(populate);
        }
        res.jsonp(movs);
    });
}
  
// GET single movie by it's ID
  
app.get('/movies/:id', function(req, res) {
    var id = req.params.id;
    var options = {
        method:'GET',
        endpoint:'movies',
        qs:{ql:"ID = '"+id+"'"}
    };
    
client.request(options, function(error, body) {
    if (error) {
    } 
    else {
        res.send(body.entities); 
    }});
});
  
// POST to base url will give error messege

app.post('/movies', function(req, res) {	
          postallmovie(req, res);
  });
  
  function postallmovie(req, res) {
      res.send('Cannot Update all Records in Movies - Please Specify ID');
};

// POST a movie

app.post('/movies/:ID/:Name/:Director/:Starring/:Year', function(req, res) {

 	var ID = req.params.ID;
    var Name = req.params.Name;
    var Director = req.params.Director;
    var Starring = req.params.Starring;
    var Year = req.params.Year;
	var e = {
		'ID' : ID,
		'Name' : Name,
		'Director' : Director,
		'Starring' : Starring,
      	'Year' : Year
    };

	createProfile(e, req, res);
});

function createProfile(e, req, res) {
	var opts = {
		type : 'movies',
		name : e.ID
	};

	client.createEntity(opts, function(err, o) {
		if (err) {
			res.jsonp(500, err);
			return;
		}
		o.set(e);
		o.save(function(err) {
			if (err) {
				res.jsonp(500, err);
				return;
			}
			res.send(201);
		});
	});
}

 // DELETE to base url will give error messege

app.delete('/movies', function(req, res) {	
          deleteallmovie(req, res);
  });
  
  function deleteallmovie(req, res) {
      res.send('Cannot Delete all Records in Movies - Please Specify ID');
  };


 // DELETE single movie by it's ID
  
app.delete('/movies/:id', function(req, res) {
      var id = req.params.id;
      var options = {
          method:'DELETE',
          endpoint:'movies',
          qs:{ql:"ID = '"+id+"'"}
      };
    
  client.request(options, function(error, body) {
      if (error) {
      } 
      else {
         res.send('If there was a match with the particular ID, that record was successfully deleted');
      }});
});
  
// This is only accept the above request conditions, otherwise throw error

app.all('*', function (req, res) {
  	res.send('The request/URN is Not allowed...Please Try Again');       
});

  // Listen for requests until the server is stopped
  
  app.listen(process.env.PORT || 9000);
  console.log('The server is running!');
