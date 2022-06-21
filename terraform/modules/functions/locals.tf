locals {
	/*functions2 = {
		default = "default",
		deleteUserSubject = "deleteUserSubject",
		getAllSubjects = "getAllSubjects",
		getUserSubjects = "getUserSubjects",
		login = "login",
		postUser = "postUser",
		postUserSubject = "postUserSubject"
	}*/
	functions = {for function in fileset("../src/functions/*", "*.js") : split("/",function)[1] => split("/",function)[1]}
}