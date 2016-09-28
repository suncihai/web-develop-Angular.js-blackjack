var app=angular.module('app',[]);

app.controller('myCtrl',function($scope){
    $scope.blackjackswitch1=true;
    $scope.blackjackswitch2=false;

    $scope.switchblackjack=function(value){
        $scope.blackjackswitch1=value;
        $scope.blackjackswitch2=!value;
    }

    //blackjack app
    //generate an array to store 52 cards(except two jokers)
    var cardArr=[];
    for(var i=1,j=1,k=0;i<53;i++){
    	var tmp={num:j,src:"images/"+i+".jpg"};
    	if(j==10){
    		if(k==3){
    			k=-1;
    			j=1;
    		}
    		k++;
    	}else{
    	   j++;
    	}
    	cardArr.push(tmp);
    }
    
    //initiate the game,enemycardshow is ai's cards object,mycardshow is player's cards object.
    /*game process is going by reference getcardsclick. enemyhasAce and myhasAce is to detect
    whether there is an A in cards because A could be counted as 11 in some situations.
    */
    //enemyAI is that let ai decide if he will continue to get card.
    var getcardsclick=1; 
    var enemycard1show={num:0,src:""};
    var enemycard2show={num:0,src:""};
    var enemycard3show={num:0,src:""};
    var enemycard4show={num:0,src:""};
    var enemycard5show={num:0,src:""};

    var mycard1show={num:0,src:""};
    var mycard2show={num:0,src:""};
    var mycard3show={num:0,src:""};
    var mycard4show={num:0,src:""};
    var mycard5show={num:0,src:""};

    $scope.enemycard1=null;
    $scope.enemycard2=null;
    $scope.enemycard3=null;
    $scope.enemycard4=null;
    $scope.enemycard5=null;

    $scope.mycard1=null;
    $scope.mycard2=null;
    $scope.mycard3=null;
    $scope.mycard4=null;
    $scope.mycard5=null;

    var enemycard1number;
	var enemycard2number;
	var enemycard3number;
	var enemycard4number;
	var enemycard5number;
	var mycard1number;
	var mycard2number;
	var mycard3number;
	var mycard4number;
	var mycard5number;

    var enemyhasAce=false;
    var myhasAce=false;

    var enemyAI=false;
    
    var resultOn=false;

	$scope.getcards=function(){
		if(!resultOn){
			if(getcardsclick==1){
			do{
				enemycard1number=Math.ceil(Math.random()*52);
				mycard1number=Math.ceil(Math.random()*52);
				var tmparr=[enemycard1number,mycard1number];
			}
			while(filtersame(tmparr))
			
			enemycard1show={num:cardArr[enemycard1number].num,src:cardArr[enemycard1number].src};
		    mycard1show={num:cardArr[mycard1number].num};
            $scope.enemycard1={num:cardArr[enemycard1number].num,src:"images/55.jpg"};
            $scope.mycard1={num:cardArr[mycard1number].num,src:cardArr[mycard1number].src};
            if(enemycard1show.num==1){
                enemyhasAce=true;
            }
            if(mycard1show.num==1){
                myhasAce=true;
            }
	        }
	        if(getcardsclick==2){
	        	do{
	                 enemycard2number=Math.ceil(Math.random()*52);
	                 mycard2number=Math.ceil(Math.random()*52);
	                 var tmparr=[enemycard1number,mycard1number,enemycard2number,mycard2number];
	        	}while(filtersame(tmparr))
	           
				enemycard2show={num:cardArr[enemycard2number].num,src:cardArr[enemycard2number].src};
				mycard2show={num:cardArr[mycard2number].num};
	            $scope.enemycard2={num:cardArr[enemycard2number].num,src:"images/55.jpg"};
	            $scope.mycard2={num:cardArr[mycard2number].num,src:cardArr[mycard2number].src};

                if(enemycard1show.num==1||enemycard2show.num==1){
                    enemyhasAce=true;
                }
                if(mycard1show.num==1||mycard2show.num==1){
                    myhasAce=true;
                }
                if(enemycard1show.num+enemycard2show.num>16+Math.ceil(Math.random()*3)){
                    enemyAI=true;
                }
	        }
	        if(getcardsclick==3){
	        	do{
	        		enemycard3number=Math.ceil(Math.random()*52);
	        		mycard3number=Math.ceil(Math.random()*52);
	        		var tmparr=[enemycard1number,mycard1number,enemycard2number,mycard2number,enemycard3number,mycard3number];
	        	}while(filtersame(tmparr))
	           
                if(!enemyAI){
                    enemycard3show={num:cardArr[enemycard3number].num,src:cardArr[enemycard3number].src};
                    $scope.enemycard3={num:cardArr[enemycard3number].num,src:"images/55.jpg"};
                }else{
                    enemycard3show={num:0,src:""};
                }

				mycard3show={num:cardArr[mycard3number].num};
	            $scope.mycard3={num:cardArr[mycard3number].num,src:cardArr[mycard3number].src};

	            if(mycard1show.num+mycard2show.num+mycard3show.num>21){
                    $scope.enemycard1={num:enemycard1show.num,src:enemycard1show.src};
                    $scope.enemycard2={num:enemycard2show.num,src:enemycard2show.src};
                    $scope.enemycard3={num:enemycard3show.num,src:enemycard3show.src};
                	$scope.gameresult_lose=true;
                	resultOn=true;
                }
                if(enemycard1show.num+enemycard2show.num+enemycard3show.num>21&&resultOn==false){
                	$scope.enemycard1={num:enemycard1show.num,src:enemycard1show.src};
                    $scope.enemycard2={num:enemycard2show.num,src:enemycard2show.src};
                    $scope.enemycard3={num:enemycard3show.num,src:enemycard3show.src};
                	$scope.gameresult_win=true;
                	resultOn=true;
                }

                if(enemycard1show.num==1||enemycard2show.num==1||enemycard3show.num==1){
                    enemyhasAce=true;
                }
                if(mycard1show.num==1||mycard2show.num==1||mycard3show.num==1){
                    myhasAce=true;
                }
                if(enemycard1show.num+enemycard2show.num+enemycard3show.num>16+Math.ceil(Math.random()*3)){
                    enemyAI=true;
                }
	        }
	        if(getcardsclick==4){
	        	do{
	        		enemycard4number=Math.ceil(Math.random()*52);
	        		mycard4number=Math.ceil(Math.random()*52);
	        		var tmparr=[enemycard1number,mycard1number,enemycard2number,mycard2number,enemycard3number,mycard3number,enemycard4number,mycard4number];
	        	}while(filtersame(tmparr))
	           
                if(!enemyAI){
                    enemycard4show={num:cardArr[enemycard4number].num,src:cardArr[enemycard4number].src};
                    $scope.enemycard4={num:cardArr[enemycard4number].num,src:"images/55.jpg"};
                }else{
                    enemycard4show={num:0,src:""};
                }

				mycard4show={num:cardArr[mycard4number].num};
	            $scope.mycard4={num:cardArr[mycard4number].num,src:cardArr[mycard4number].src};

	            if(mycard1show.num+mycard2show.num+mycard3show.num+mycard4show.num>21){
                    $scope.enemycard1={num:enemycard1show.num,src:enemycard1show.src};
                    $scope.enemycard2={num:enemycard2show.num,src:enemycard2show.src};
                    $scope.enemycard3={num:enemycard3show.num,src:enemycard3show.src};
                    $scope.enemycard4={num:enemycard4show.num,src:enemycard4show.src};
                	$scope.gameresult_lose=true;
                	resultOn=true;
                }
                if(enemycard1show.num+enemycard2show.num+enemycard3show.num+enemycard4show.num>21&&resultOn==false){
                	$scope.enemycard1={num:enemycard1show.num,src:enemycard1show.src};
                    $scope.enemycard2={num:enemycard2show.num,src:enemycard2show.src};
                    $scope.enemycard3={num:enemycard3show.num,src:enemycard3show.src};
                    $scope.enemycard4={num:enemycard4show.num,src:enemycard4show.src};
                	$scope.gameresult_win=true;
                	resultOn=true;
                }

                if(enemycard1show.num==1||enemycard2show.num==1||enemycard3show.num==1||enemycard4show.num==1){
                    enemyhasAce=true;
                }
                if(mycard1show.num==1||mycard2show.num==1||mycard3show.num==1||mycard4show.num==1){
                    myhasAce=true;
                }
                if(enemycard1show.num+enemycard2show.num+enemycard3show.num+enemycard4show.num>16+Math.ceil(Math.random()*3)){
                    enemyAI=true;
                }
	        }
	        if(getcardsclick==5){
	        	do{
	                enemycard5number=Math.ceil(Math.random()*52);
	                mycard5number=Math.ceil(Math.random()*52);
	           		var tmparr=[enemycard1number,mycard1number,enemycard2number,mycard2number,enemycard3number,mycard3number,enemycard4number,mycard4number,enemycard5number,mycard5number];
	        	}while(filtersame(tmparr))
	           
                if(!enemyAI){
                    enemycard5show={num:cardArr[enemycard5number].num,src:cardArr[enemycard5number].src};
                    $scope.enemycard5={num:cardArr[enemycard5number].num,src:"images/55.jpg"};
                }else{
                    enemycard5show={num:0,src:""};
                }

				mycard5show={num:cardArr[mycard5number].num};
	            $scope.mycard5={num:cardArr[mycard5number].num,src:cardArr[mycard5number].src};

	            if(mycard1show.num+mycard2show.num+mycard3show.num+mycard4show.num+mycard5show.num>21){
                    $scope.enemycard1={num:enemycard1show.num,src:enemycard1show.src};
                    $scope.enemycard2={num:enemycard2show.num,src:enemycard2show.src};
                    $scope.enemycard3={num:enemycard3show.num,src:enemycard3show.src};
                    $scope.enemycard4={num:enemycard4show.num,src:enemycard4show.src};
                    $scope.enemycard5={num:enemycard5show.num,src:enemycard5show.src};
                	$scope.gameresult_lose=true;
                	resultOn=true;
                }
                if(enemycard1show.num+enemycard2show.num+enemycard3show.num+enemycard4show.num+enemycard5show.num>21&&resultOn==false){
                	$scope.enemycard1={num:enemycard1show.num,src:enemycard1show.src};
                    $scope.enemycard2={num:enemycard2show.num,src:enemycard2show.src};
                    $scope.enemycard3={num:enemycard3show.num,src:enemycard3show.src};
                    $scope.enemycard4={num:enemycard4show.num,src:enemycard4show.src};
                    $scope.enemycard5={num:enemycard5show.num,src:enemycard5show.src};
                	$scope.gameresult_win=true;
                	resultOn=true;
                }
                if(enemycard1show.num==1||enemycard2show.num==1||enemycard3show.num==1||enemycard4show.num==1||enemycard5show.num==1){
                    enemyhasAce=true;
                }
                if(mycard1show.num==1||mycard2show.num==1||mycard3show.num==1||mycard4show.num==1||mycard5show.num==1){
                    myhasAce=true;
                }
	        }
	        if(getcardsclick<6){
	        	getcardsclick++;
	        }
		}
	};
    
    //calculate both ai and player's sum of cards
    var sumofarr1=0;
    var sumofarr2=0;

    function filtersame(arr){
        for(var i=0;i<arr.length;i++){
            for(var j=i+1;j<arr.length;j++){
                if(arr[j]==arr[i]){
                    return true;
                }
            }
        }
        return false;
    }

    function gameset(arr1,arr2,enemyhasace,myhasace){
        for(var i=0;i<arr1.length;i++){
        	sumofarr1+=arr1[i];
        }
        for(var j=0;j<arr2.length;j++){
        	sumofarr2+=arr2[j];
        }
        
        console.log(sumofarr1);
        console.log(sumofarr2);

        if(enemyhasace){
            if(sumofarr1<=11){
                sumofarr1+=10;
            }
        }
        if(myhasace){
            if(sumofarr2<=11){
                sumofarr2+=10;
            }
        }
        if(sumofarr1>sumofarr2){
        	return false;
        }else{
        	return true;
        }
    }
    
    //different card numbers cases
    function game(){
    	if(getcardsclick==2){
    		var tmp1=[enemycard1show.num];
    		var tmp2=[mycard1show.num];
        	$scope.gameresult_win=gameset(tmp1,tmp2,enemyhasAce,myhasAce);
        	$scope.gameresult_lose=!$scope.gameresult_win;
        };
        if(getcardsclick==3){
        	var tmp1=[enemycard1show.num,enemycard2show.num];
    		var tmp2=[mycard1show.num,mycard2show.num];
        	$scope.gameresult_win=gameset(tmp1,tmp2,enemyhasAce,myhasAce);
        	$scope.gameresult_lose=!$scope.gameresult_win;
        };
        if(getcardsclick==4){
        	var tmp1=[enemycard1show.num,enemycard2show.num,enemycard3show.num];
    		var tmp2=[mycard1show.num,mycard2show.num,mycard3show.num];
        	$scope.gameresult_win=gameset(tmp1,tmp2,enemyhasAce,myhasAce);
        	$scope.gameresult_lose=!$scope.gameresult_win;
        };
        if(getcardsclick==5){
        	var tmp1=[enemycard1show.num,enemycard2show.num,enemycard3show.num,enemycard4show.num];
    		var tmp2=[mycard1show.num,mycard2show.num,mycard3show.num,mycard4show.num];
        	$scope.gameresult_win=gameset(tmp1,tmp2,enemyhasAce,myhasAce);
        	$scope.gameresult_lose=!$scope.gameresult_win;
        };
        if(getcardsclick==6){
        	var tmp1=[enemycard1show.num,enemycard2show.num,enemycard3show.num,enemycard4show.num,enemycard5show.num];
    		var tmp2=[mycard1show.num,mycard2show.num,mycard3show.num,mycard4show.num,mycard5show.num];
        	$scope.gameresult_win=gameset(tmp1,tmp2,enemyhasAce,myhasAce);
        	$scope.gameresult_lose=!$scope.gameresult_win;
        };
    }
    
    //show the final result
	$scope.showresult=function(){
        if(!resultOn){
    		$scope.enemycard1={num:enemycard1show.num,src:enemycard1show.src};
            $scope.enemycard2={num:enemycard2show.num,src:enemycard2show.src};
            $scope.enemycard3={num:enemycard3show.num,src:enemycard3show.src};
            $scope.enemycard4={num:enemycard4show.num,src:enemycard4show.src};
            $scope.enemycard5={num:enemycard5show.num,src:enemycard5show.src};
            resultOn=true;
            game();
        }
        console.log(sumofarr1+" "+sumofarr2);
	};
    
    //reset game
	$scope.resetgame=function(){
		resultOn=false;
        enemyhasAce=false;
        myhasAce=false;
        enemyAI=false;
		getcardsclick=1;
		sumofarr1=0;
		sumofarr2=0;
		$scope.enemycard1=null;
		$scope.enemycard2=null;
		$scope.enemycard3=null;
		$scope.enemycard4=null;
		$scope.enemycard5=null;
		$scope.mycard1=null;
		$scope.mycard2=null;
		$scope.mycard3=null;
		$scope.mycard4=null;
		$scope.mycard5=null;
		enemycard1show={};
	    enemycard2show={};
	    enemycard3show={};
	    enemycard4show={};
	    enemycard5show={};
	    mycard1show={};
        mycard2show={};
        mycard3show={};
        mycard4show={};
        mycard5show={};
        $scope.gameresult_lose=false;
        $scope.gameresult_win=false;
	};
})