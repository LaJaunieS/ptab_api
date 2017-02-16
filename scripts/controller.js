document.getElementById("case-search-results").style.display = "none";
document.getElementById("patent-search-results").style.display = "none";
document.getElementById("error-message").style.display = "none";
document.getElementById("patent-search").style.display = "none";
document.getElementById("case-search").style.display = "none";



             


angular.module("ptabApp",[])
        

        .controller('ptabCtrl', ['$scope', '$http', function($scope, $http){
            
            console.log('angular app loaded');
            
            
            
            //build query string based on user input
            $scope.query = {
                patentNumber: "",
                docType: "",
                caseNumber: "",
                queryErrorMessage: ""
            };
            
            $scope.ps = document.getElementById("patent-search");
            $scope.cs = document.getElementById("case-search");
            $scope.patentNumberJson = {}
            $scope.patentSearch = "trials?patentNumber="; //builds url string for patent search
            $scope.caseSearch = "trials/" + $scope.query.caseNumber;
            
            function getDocuments(url){
                    evt.preventDefault();
                    let documentsCall = {
                        method: "GET",
                        url: url
                    };
                    //load document list template(TBD)
                };
            
                
            
             $scope.patentSearchCall =  {
                    method: 'GET',
                    url: "https://ptabdata.uspto.gov/ptab-api/" + $scope.patentSearch    + $scope.query.patentNumber,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
            
            $scope.caseSearchCall = {
                   method: 'GET',
                    url: "https://ptabdata.uspto.gov/ptab-api/" + $scope.caseSearch,
                    headers: {
                        'Content-Type': 'application/json'
                    }                    
                };
             
            $scope.addTemplateToDom = function(el) {
                document.getElementById(el).style.display = "initial";
            };
            
            $scope.removeTemplateFromDom  = function(el) {
                document.getElementById(el).style.display = "none";
            };
            
             $scope.loadSearch = function(thisEl, otherEl) {
                $scope.addTemplateToDom(thisEl);
                $scope.removeTemplateFromDom(otherEl);
                $scope.removeTemplateFromDom("patent-search-results");
                $scope.removeTemplateFromDom("error-message");
                $scope.removeTemplateFromDom("case-search-results");
            };
              
            
                        
            
            
            //make api call based on query string parameters
            
            //default string for case search=  https://ptabdata.uspto.gov/ptab-api/trials/ + {trialNo} + /documents? + title={doc title}
            
            //default string for patent search = https://ptabdata.uspto.gov/ptab-api/trials?patentNumber= + {patentNo}
            
            //example request url 
               
            
            // patent search https://ptabdata.uspto.gov/ptab-api/trials?patentNumber=6314409 -- returns a clickable list of cases
            
            // case search https://ptabdata.uspto.gov/ptab-api/trials/CBM2014-00157/documents   -- returns a clickable list of documents
            
             //doc search in a case= https://ptabdata.uspto.gov/ptab-api/trials/ipr2014-00786/documents?title=petition
            
            //hold response json in an object
            
                    
            //parse object to display returned values to user
            
                    
            //for patent search, click event to send another get request for case information
            
            
            
            
            
            
            //functions to make calls to api
            $scope.apiCall = function(call) {
                //call argument passed in from getPatentData() on click       
                
                
                //call argument passed in from apiCall() -->getPatentData()
                $http(call).then(
                    function successCallback(data) {
                    $scope.jsonData = data;
                    queryErrorExists =  $scope.jsonData.data.results.length === 0;                      
                    if (queryErrorExists) {
                        
                        $scope.removeTemplateFromDom("case-search-results");
                        $scope.removeTemplateFromDom("patent-search-results");
                        $scope.addTemplateToDom("error-message");
                        $scope.query.queryErrorMessage = "That patent number doesn't exist, is not in the PTAB database or there was an error retrieving your query. Please enter another number or try your request again";
                        console.log($scope.query.queryErrorMessage);
                        //add error template to DOM
                    } else if (call == $scope.patentSearchCall){
                        console.log("Patent Search initiated");
                        $scope.removeTemplateFromDom("case-search-results");
                        $scope.removeTemplateFromDom("error-message");
                        $scope.addTemplateToDom("patent-search-results");
                        console.log($scope.jsonData);
                        //$scope.addTemplatesToDom('current-conditions', 'ConditionsTemplateUrl');
                    } else if (call == $scope.caseSearchCall) {
                        console.log("Case Search initiated");
                        $scope.removeTemplateFromDom("patent-search-results");
                        $scope.removeTemplateFromDom("error-message");
                        $scope.addTemplateToDom("case-search-results");
                        console.log($scope.jsonData);
                    }
                        
                    },
                    function errorCallback() {
                            alert('Failed to connect to the API. Please check your connection and try again.');
                            });
                };
            
             
        //aggregate functions necessary to build url string, make api call, and load templates
            $scope.getPatentData = function(call, search_type, search_param) {
                call["url"] ="https://ptabdata.uspto.gov/ptab-api/" + search_type + search_param;
                console.log(call.url)
                $scope.apiCall(call);   
                };
            
            
        }]) //close controller
         .directive('patentSearchResults', function() {
        return {
            restrict: 'E',
            templateUrl: "templates/patent-search-results.html"
            };
        })
         .directive('caseSearchResults', function() {
        return {
            restrict: 'E',
            templateUrl: "templates/case-search-results.html"
            };
        })
        .directive('errorMessage', function() {
        return {
            restrict: 'E',
            templateUrl: "templates/error-message.html"
            };
        })
        .directive('patentSearch', function() {
        return {
            restrict: 'E',
            templateUrl: "templates/patent-search.html"
            };
        })
        .directive('caseSearch', function() {
        return {
            restrict: 'E',
            templateUrl: "templates/case-search.html"
            };
        })
        

                
                

                
                
                
                
                
        
        



       


        
        
        
        
        
        
