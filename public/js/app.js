const app = angular.module('MyApp', []);

app.controller('MyController', ['$http', function($http){
  const controller = this;
  this.indexOfEditFormToShow = null;
//create
  this.createGig = function(){
    $http({
      method:'POST',
      url: '/gigs',
      data: {
        venue: this.venue,
        address: this.address,
        contact: this.contact,
        pay: this.pay
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
      address: this.updatedAddress,
      contact: this.updatedContact,
      pay: this.updatedPay
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
