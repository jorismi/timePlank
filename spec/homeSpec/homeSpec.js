describe("Home", function() {
  var Home = require('../../src/pages/home');
  var home;

  beforeEach(function() {
    home = new Home();
  });

  it("should be able to play a Song", function() {
    home.repsNumber = 3;
    home.changeRepsNumber(5);
    expect(home.repsNumber).toEqual(8);
  });
});
