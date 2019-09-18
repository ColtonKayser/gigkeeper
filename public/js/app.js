const app = angular.module('MyApp', []);

app.controller('MyController', ['$http', function($http){
  const controller = this;
  this.indexOfEditFormToShow = null;

  // const roundDown = (valueToRound) => {
  //   return Math.floor(valueToRound)
  // }

  // include path for partials
  this.includePath = 'partials/savedgigs.html';
  this.changeInclude = (path) => {
    this.includePath = 'partials/' + path + '.html';
  }


//create
  this.createGig = function(){
    $http({
      method:'POST',
      url: '/gigs',
      data: {
        venue: this.venue,
        date: this.date,
        contact: this.contact,
        pay: this.pay,
        gigLength: this.gigLength,
        travelDistance: this.travelDistance,
        travelTime: this.travelTime,
        costOfGas: this.costOfGas,
        milesPerGallon: this.milesPerGallon,
        totalTime: (this.gigLength + this.travelTime),
        gasExpense: ((this.travelDistance / this.milesPerGallon) * this.costOfGas),
        extraneousExpenses: this.extraneousExpenses,
        totalExpense: (((this.travelDistance / this.milesPerGallon) * this.costOfGas) + this.extraneousExpenses),
        payPerHour: (((this.pay - this.gasExpense - this.extraneousExpenses) / this.totalTime)),
        netPay: ((this.pay - this.extraneousExpenses) - ((this.travelDistance / this.milesPerGallon) * this.costOfGas))
      }
    }).then(function(response){
      controller.getGigs();
    }, function(){
      console.log('error');
    });
  }

//index
this.getGigs = function(){
  $http({
    method: 'GET',
    url: '/gigs',
  }).then(function(response){
    // for (let i = 0; i < response.data.length; i++) {
    //
    // }

    controller.gigs = response.data;
  }, function(){
    console.log('error');
  });
}

//Delete
this.deleteGig = function(gig){
  $http({
    method: 'DELETE',
    url: '/gigs/' + gig._id
  }).then(
    function(response){
      controller.getGigs();
    },
    function(error){
      console.log(error);
    }
  )
}

//edit
this.editGig = function(gig){
  $http({
    method: 'PUT',
    url: '/gigs/' + gig._id,
    data: {
      venue: this.updatedVenue,
      date: this.updatedDate,
      contact: this.updatedContact,
      pay: this.updatedPay,
      gigLength: this.updatedGigLength,
      travelDistance: this.updatedTravelDistance,
      travelTime: this.updatedTravelTime,
      costOfGas: this.updatedCostOfGas,
      milesPerGallon: this.updatedMilesPerGallon,
      extraneousExpenses: this.updatedExtraneousExpenses,
      netPay: ((this.updatedPay - this.updatedExtraneousExpenses) - ((this.updatedTravelDistance / this.updatedMilesPerGallon) * this.updatedCostOfGas)),
      payPerHour: (((this.updatedPay - this.updatedGasExpense) / (this.updatedGigLength + this.updatedTravelTime)))
    }
  }).then(
    function(response){
      controller.getGigs();
      controller.indexOfEditFormToShow = null;
    },
    function(error){
      console.log(error);
    }
  )
}

  this.getGigs();
}]);
