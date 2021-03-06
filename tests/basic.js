/* 
	Tests the following:
	 - Jobs.register 
	 - Jobs.run 
	 - Jobs.get
	 - Jobs.cancel
	 - Jova.
*/

JobsTests1 = function () {

	// O - Clear the collection

	console.log("--- 0 ---")
	var clear = Jobs.clear("*")
	console.log(clear)
	
	// 1 - Register the Job

	Jobs.register({
		"sayHi": function (name) {
			console.log("Hi " + name);
			this.success();
		}
	})

	// 2 - Schedule a job

	var jobId = Jobs.run("sayHi", "Steve", {
		in: {
			years: 1
		},
		priority: 1000,
		callback: function () {
			console.log("Callback arguments from Jobs.run:");
			console.log(arguments);
		}
	})

	jobId = jobId._id

	// 3 - Check the due date

	var jobDoc = Jobs.get(jobId);
	var date = new Date();
	var targetYear = date.getYear() + 1 

	console.log("--- 3 ---")
	console.log("Job doc after creation:")
	console.log(jobDoc);

	if (jobDoc.due.getYear() === targetYear) {
		console.log("Date looks fine")
	} else {
		console.log("Error around due date check")
	}

	// 4 - Cancel the job 

	var cancel = Jobs.cancel(jobId);

	// 5 - Check the job was canceled

	var jobDoc = Jobs.get(jobId);

	console.log("--- 5 ---")
	console.log("Job doc after cancel:")
	console.log(jobDoc)

	if (jobDoc.state === "cancelled") {
		console.log("Job was cancelled")	
	} else {
		console.log("Job cancel failed")
	}

	// 6 - Log whatever is in the collection

	console.log("--- 6 ---")
	var allJobDocs = JobsInternal.Utilities.collection.find().fetch();
	console.log(allJobDocs);
}