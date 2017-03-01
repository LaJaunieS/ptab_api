        //default string for case search=  https://ptabdata.uspto.gov/ptab-api/trials/ + {trialNo} + /documents? + title={doc title}
            
            //default string for patent search = https://ptabdata.uspto.gov/ptab-api/trials?patentNumber= + {patentNo}
            
            // patent search https://ptabdata.uspto.gov/ptab-api/trials?patentNumber=6314409 -- returns a clickable list of cases
            
            // case search https://ptabdata.uspto.gov/ptab-api/trials/CBM2014-00157/documents   -- returns a clickable list of documents
            
             //doc search in a case= https://ptabdata.uspto.gov/ptab-api/trials/ipr2014-00786/documents?title=petition


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
            
            $scope.patentNumberJson = {}; //will hold json data
            $scope.patentSearch = "trials?patentNumber="; //builds url string for patent search
            $scope.caseSearch = "trials/" + $scope.query.caseNumber;
            $scope.caseTitleSearch = "trials/" + $scope.query.caseNumber;
            
            //get request to download a single document
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
                    url: "https://ptabdata.uspto.gov/ptab-api/" + $scope.caseSearch + "/documents",
                    headers: {
                        'Content-Type': 'application/json'
                    }                    
                };
            
            $scope.caseTitleSearchCall = {
                   method: 'GET',
                    url: "https://ptabdata.uspto.gov/ptab-api/" + $scope.caseSearch,
                    headers: {
                        'Content-Type': 'application/json'
                    }                    
                };
                        
            //bringing templates in and out of view 
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
              
            //functions to make calls to api
            $scope.apiCall = function(call) {
            //call argument passed in from getPatentData() -->apiCall() --> $http()
                $http(call).then(
                    function successCallback(data) {
                    $scope.jsonData = data;
                    
                    if (call === $scope.patentSearchCall){
                        queryErrorExists =  $scope.jsonData.data.results.length === 0; 
                        if (queryErrorExists) {
                            console.log(data);
                            $scope.removeTemplateFromDom("case-search-results");
                            $scope.removeTemplateFromDom("patent-search-results");
                            $scope.addTemplateToDom("error-message");
                            $scope.query.queryErrorMessage = "That patent number doesn't exist, is not in the PTAB database, or there was an error retrieving your query. Please enter another number or try your request again";
                            console.log($scope.query.queryErrorMessage);
                            //add error template to DOM
                            } else {
                            console.log("Patent Search initiated");
                            console.log($scope.jsonData);
                            $scope.removeTemplateFromDom("case-search-results");
                            $scope.removeTemplateFromDom("error-message");
                            $scope.addTemplateToDom("patent-search-results");
                            };
                    } else if (call === $scope.caseSearchCall) {
                        console.log("Case Search initiated");
                        console.log($scope.jsonData);
                        $scope.removeTemplateFromDom("patent-search-results");
                        $scope.removeTemplateFromDom("error-message");
                        $scope.addTemplateToDom("case-search-results");
                    } else if (call === $scope.caseTitleSearchCall) {
                        $scope.caseTitleData = $scope.jsonData; 
                        $scope.removeTemplateFromDom("patent-search-results");
                        $scope.removeTemplateFromDom("error-message");
                        $scope.addTemplateToDom("case-search-results");
                    };
                },
                function errorCallback(data) {
                        //if 400 bad request
                        //if 
                        if(data.data.status === 400) {
                            $scope.addTemplateToDom("error-message");
                            $scope.query.queryErrorMessage = data.data.message;
                            } else {
                                $scope.addTemplateToDom("error-message");
                                $scope.query.queryErrorMessage = "There was a problem connecting to the API. Please check your connection and try again.";
                            };
                        });  //close $http()
                    };  //close apiCall() 
            
             
        //aggregate function to build url string, make api call, and load templates
            $scope.getPatentData = function(call, search_type, search_param) {
                call["url"] ="https://ptabdata.uspto.gov/ptab-api/" + search_type + search_param;
                if (call.url === "https://ptabdata.uspto.gov/ptab-api/trials/" || call.url === "https://ptabdata.uspto.gov/ptab-api/trials?patentNumber=") {
                    $scope.addTemplateToDom("error-message");
                    $scope.query.queryErrorMessage = "Field cannot be blank";
                    return Error
                } else {
                    console.log(call.url);
                    $scope.apiCall(call);   
                    };
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
        .directive('caseHeader', function() {
        return {
            restrict: 'E',
            templateUrl: "templates/case-header.html"
            };
        })
        

                
                

                
                
                
                
                
        
        



       


        
        
        
        
        
        
