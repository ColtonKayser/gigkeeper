const app = angular.module('MyApp', []);

app.controller('MyController', ['$http', function($http){
  const controller = this;
  this.indexOfEditFormToShow = null;

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
        address: this.address,
        contact: this.contact,
        contactInfo: this.contactInfo,
        pay: this.pay,
        gigType: this.gigType
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
      contactInfo: this.updatedContactInfo,
      pay: this.updatedPay,
      gigType: this.updatedGigType
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
