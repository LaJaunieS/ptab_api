

angular.module("ptabApp",[])


        .controller('ptabCtrl', ['$scope', '$http', function($scope, $http){
            //build query string based on user input
            $scope.query = {
                patentNumber: "",
                docType: "",
                caseNumber: "",
                queryErrorMessage: ""
            };
            
            
            
            //make api call based on query string parameters
            $scope.query.patentNumber = "6314409";
            $scope.query.caseNumber = "IPR2014-00500"
            console.log($scope.query.patentNumber);
            //default string for case search=  https://ptabdata.uspto.gov/ptab-api/trials/ + {trialNo} + /documents? + title={doc title}
            
            //default string for patent search = https://ptabdata.uspto.gov/ptab-api/trials?patentNumber= + {patentNo}
            
            //example request url 
               
            
            // patent search https://ptabdata.uspto.gov/ptab-api/trials?patentNumber=6314409 -- returns a clickable list of cases
            
            // case search https://ptabdata.uspto.gov/ptab-api/trials/CBM2014-00157/documents   -- returns a clickable list of documents
            
             //doc search in a case= https://ptabdata.uspto.gov/ptab-api/trials/ipr2014-00786/documents?title=petition
            
            //hold response json in an object
            
                    
            //parse object to display returned values to user
            
                    
            //for patent search, click event to send another get request for case information
            
            
            console.log('angular app loaded');
            
            
            
            //functions to make calls to api
            $scope.apiCall = function() {
                let patentSearchCall =  {
                    method: 'GET',
                    url: "https://ptabdata.uspto.gov/ptab-api/trials?patentNumber=" + $scope.query.patentNumber,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
                
                let caseSearchCall = {
                   method: 'GET',
                    url: "https://ptabdata.uspto.gov/ptab-api/trials/" + $scope.query.caseNumber + "/documents",
                    headers: {
                        'Content-Type': 'application/json'
                    }                    
                };
                
                
                $http(caseSearchCall).then(
                    function successCallback(data) {
                        $scope.caseNumberJson = data;
                        queryErrorExists =  $scope.caseNumberJson.data.results.length == 0;                      
                        if (queryErrorExists) {
                        $scope.query.queryErrorMessage = "That patent number doesn't exist or there was an error retrieving your query. Please enter another number or try your request again";
                        console.log($scope.query.queryErrorMessage);
                        //add error template to DOM
                    } else {
                        console.log($scope.caseNumberJson);
                        //$scope.addTemplatesToDom('current-conditions', 'ConditionsTemplateUrl');
                    };
                    
                    }, function errorCallback() {
                    alert('Failed to connect to the API. Please check your connection and try again.');
                });
                        
                
                
                
                
//                $http(patentSearchCall).then(
//                    function successCallback(data) {
//                    $scope.patentNumberJson = data;
//                    queryErrorExists =  $scope.patentNumberJson.data.results.length == 0;                      
//                        if (queryErrorExists) {
//                        $scope.query.queryErrorMessage = "That patent number doesn't exist or there was an error retrieving your query. Please enter another number or try your request again";
//                        console.log($scope.query.queryErrorMessage);
//                        //add error template to DOM
//                    } else {
//                        console.log($scope.patentNumberJson);
//                        //$scope.addTemplatesToDom('current-conditions', 'ConditionsTemplateUrl');
//                    };
//                        
//                    },
//                    function errorCallback() {
//                            alert('Failed to connect to the API. Please check your connection and try again.');
//                            });
                };
            
             
        //aggregate functions necessary to build url string, make api call, and load templates
            $scope.getPatentData = function() {
                $scope.apiCall();   
                }();
        }]) //close controller
        
        



       


        
        
        
        
        
        
