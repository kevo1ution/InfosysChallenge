var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var MongoUrl = "mongodb://localhost:27017/mydb";
var client = new MongoClient(MongoUrl);

var dbo;

client.connect(function(err){
	//open update database
	dbo = client.db("mydb");
});

//non profit information
function addReq(table, callback){
	//
	// const table = {
	// 	name: "",
	// 	skills: "", 
	// 	city: "",
	// 	exp: "",
	// 	email: "",
	// 	start: "",
	// 	numOfEmployees: ""
	// }
	dbo.collection("Requests").insertOne(table, function(err, res){
		if(err){
			callback({success: false, id: "-1"})
			throw err;
		}else{
			callback({ success: true, id: res.ops[0]._id });
		}
	});
}

function getReq(id, callback){
	dbo.collection("Requests").find({"id": id}).toArray(function(err,docs){
		callback(docs);
	});
}

function closeDB(){
	client.close(); //close out the database
}

module.exports = {
	addReq: addReq,
	getReq: getReq,
	closeDB: closeDB,
};


